import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const SITE_ORIGIN = process.env.SITE_ORIGIN || "https://lyx058019.github.io";

const projectRoot = process.cwd();
const postsDir = path.join(projectRoot, "src", "data", "posts");
const publicDir = path.join(projectRoot, "public");

function toAbsoluteUrl(p) {
  if (/^https?:\/\//i.test(p)) return p;
  const base = SITE_ORIGIN.replace(/\/$/, "");
  const pp = p.startsWith("/") ? p : `/${p}`;
  return `${base}${pp}`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseDateToRss(dateStr) {
  // Accept YYYY-MM-DD (treated as UTC)
  if (!dateStr) return null;
  const m = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 0, 0, 0));
  return d.toUTCString();
}

async function getPosts() {
  let entries = [];
  try {
    entries = await fs.readdir(postsDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const mdFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name);

  const posts = [];
  for (const fileName of mdFiles) {
    const filePath = path.join(postsDir, fileName);
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    const slug = fileName.replace(/\.md$/, "");
    const title = parsed.data?.title || slug;
    const description = parsed.data?.description || "";
    const date = parsed.data?.date || "";
    posts.push({ slug, title, description, date });
  }

  posts.sort((a, b) => {
    const at = Date.parse(a.date) || 0;
    const bt = Date.parse(b.date) || 0;
    return bt - at;
  });

  return posts;
}

async function writeSitemap(posts) {
  const staticPaths = ["/", "/blog", "/tools", "/about", "/projects"].filter(Boolean);
  const postPaths = posts.map((p) => `/blog/${p.slug}`);
  const urls = [...staticPaths, ...postPaths];

  const body = urls
    .map((p) => `  <url>\n    <loc>${escapeXml(toAbsoluteUrl(p))}</loc>\n  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(path.join(publicDir, "sitemap.xml"), xml, "utf8");
}

async function writeRss(posts) {
  const items = posts
    .map((p) => {
      const link = toAbsoluteUrl(`/blog/${p.slug}`);
      const pubDate = parseDateToRss(p.date) || new Date().toUTCString();
      return [
        "    <item>",
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid>${escapeXml(link)}</guid>`,
        `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
        `      <description><![CDATA[${p.description || ""}]]></description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const lastBuildDate = new Date().toUTCString();
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>LYX.DEV Blog</title>",
    `    <link>${escapeXml(toAbsoluteUrl("/blog"))}</link>`,
    "    <description>lyx058019 的博客订阅。</description>",
    "    <language>zh-CN</language>",
    `    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(path.join(publicDir, "rss.xml"), xml, "utf8");
}

const posts = await getPosts();
await writeSitemap(posts);
await writeRss(posts);

console.log(`generated sitemap.xml + rss.xml (posts: ${posts.length})`);
