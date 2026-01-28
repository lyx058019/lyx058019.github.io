import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const projectRoot = process.cwd()
const postsDir = path.join(projectRoot, 'src', 'data', 'posts')
const outFile = path.join(projectRoot, 'src', 'data', 'posts.index.json')

function normalizeTags(v) {
  if (!Array.isArray(v)) return []
  return v.filter((t) => typeof t === 'string' && t.trim()).map((t) => t.trim())
}

async function getPosts() {
  let entries = []
  try {
    entries = await fs.readdir(postsDir, { withFileTypes: true })
  } catch {
    return []
  }

  const mdFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name)

  const posts = []
  for (const fileName of mdFiles) {
    const filePath = path.join(postsDir, fileName)
    const raw = await fs.readFile(filePath, 'utf8')
    const parsed = matter(raw)

    const id = fileName.replace(/\.md$/, '')
    const title = typeof parsed.data?.title === 'string' ? parsed.data.title : id
    const description = typeof parsed.data?.description === 'string' ? parsed.data.description : ''
    const date = typeof parsed.data?.date === 'string' ? parsed.data.date : ''
    const tags = normalizeTags(parsed.data?.tags)

    posts.push({ id, title, date, description, tags })
  }

  posts.sort((a, b) => {
    const at = Date.parse(a.date) || 0
    const bt = Date.parse(b.date) || 0
    return bt - at
  })

  return posts
}

const posts = await getPosts()
await fs.mkdir(path.dirname(outFile), { recursive: true })
await fs.writeFile(outFile, `${JSON.stringify(posts, null, 2)}\n`, 'utf8')

console.log(`generated posts.index.json (posts: ${posts.length})`)
