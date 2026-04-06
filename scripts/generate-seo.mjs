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
  const d = new Date(
    Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 0, 0, 0),
  );
  return d.toUTCString();
}

function parseDateToSitemap(dateStr) {
  // Accept YYYY-MM-DD (treated as UTC)
  if (!dateStr) return null;
  const m = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const d = new Date(
    Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 0, 0, 0),
  );
  return d.toISOString();
}

function getPriority(pathname) {
  if (pathname === "/") return "1.0";
  if (pathname === "/blog") return "0.9";
  if (pathname.startsWith("/blog/")) return "0.8";
  if (pathname === "/tools" || pathname === "/projects") return "0.7";
  if (pathname.startsWith("/tools/")) return "0.6";
  return "0.5";
}

function getChangefreq(pathname) {
  if (pathname === "/" || pathname === "/blog") return "daily";
  if (pathname.startsWith("/blog/")) return "weekly";
  if (pathname === "/tools" || pathname === "/projects") return "weekly";
  if (pathname.startsWith("/tools/")) return "monthly";
  return "monthly";
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
    const tags = Array.isArray(parsed.data?.tags) ? parsed.data.tags : [];
    posts.push({ slug, title, description, date, tags });
  }

  posts.sort((a, b) => {
    const at = Date.parse(a.date) || 0;
    const bt = Date.parse(b.date) || 0;
    return bt - at;
  });

  return posts;
}

async function writeSitemap(posts) {
  const staticPages = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/blog", priority: "0.9", changefreq: "daily" },
    { path: "/tools", priority: "0.7", changefreq: "weekly" },
    { path: "/projects", priority: "0.7", changefreq: "weekly" },
  ];

  const postEntries = posts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: "0.8",
    changefreq: "weekly",
    lastmod: parseDateToSitemap(p.date),
  }));

  const allUrls = [
    ...staticPages.map((s) => ({ ...s, lastmod: new Date().toISOString() })),
    ...postEntries,
  ];

  const body = allUrls
    .map((u) => {
      const lastmodTag = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : "";
      return `  <url>
    <loc>${escapeXml(toAbsoluteUrl(u.path))}</loc>${lastmodTag}
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>\n`;
  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(path.join(publicDir, "sitemap.xml"), xml, "utf8");
}

async function writeRss(posts) {
  const items = posts
    .map((p) => {
      const link = toAbsoluteUrl(`/blog/${p.slug}`);
      const pubDate = parseDateToRss(p.date) || new Date().toUTCString();
      const categories = p.tags
        ? p.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n") + "\n"
        : "";

      return [
        "    <item>",
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
        `      <author>micrabbit@example.com (MicRabbit)</author>`,
        categories,
        `      <description><![CDATA[${p.description || ""}]]></description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const lastBuildDate = new Date().toUTCString();
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    "  <channel>",
    "    <title>MicRabbit Blog</title>",
    `    <link>${escapeXml(toAbsoluteUrl("/blog"))}</link>`,
    `    <atom:link href="${escapeXml(toAbsoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml" />`,
    "    <description>MicRabbit 的博客订阅，分享前端工程化、Vue、TypeScript、AI 实战等技术与思考。</description>",
    "    <language>zh-CN</language>",
    "    <managingEditor>micrabbit@example.com (MicRabbit)</managingEditor>",
    "    <webMaster>micrabbit@example.com (MicRabbit)</webMaster>",
    "    <image>",
    "      <url>https://lyx058019.github.io/favicon.svg</url>",
    "      <title>MicRabbit Blog</title>",
    "      <link>https://lyx058019.github.io/</link>",
    "    </image>",
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
