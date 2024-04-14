import { promises as fs } from 'fs'
import { Link } from 'next-view-transitions'
import path from 'path'

export default async function Page() {
  // await new Promise((resolve) => setTimeout(resolve, 1000))

  const articles = await fs.readdir(
    path.join(process.cwd(), 'app', 'thoughts', '_articles')
  )

  const items = []
  for (const article of articles) {
    if (!article.endsWith('.mdx')) continue
    const module = await import('./_articles/' + article)

    if (!module.metadata) throw new Error('Missing `metadata` in ' + article)

    items.push({
      slug: article.replace(/\.mdx$/, ''),
      title: module.metadata.title,
      date: module.metadata.date || '-',
      sort: Number(module.metadata.date?.replaceAll('.', '') || 0),
    })
  }
  items.sort((a, b) => b.sort - a.sort)

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.slug} className='font-medium'>
            <Link
              href={`/thoughts/${item.slug}`}
              className='group flex gap-1 justify-between items-center'
            >
              <span className='block group-hover:text-rurikon-600'>
                {item.title}
              </span>
              <span className='text-sm dot-leaders flex-1 text-rurikon-200 font-normal group-hover:text-rurikon-400 transition-colors leading-none'></span>
              <time className='block text-rurikon-300 tabular-nums font-normal tracking-tighter group-hover:text-rurikon-500 transition-colors'>
                {item.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
