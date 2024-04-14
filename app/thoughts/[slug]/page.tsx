import { promises as fs } from 'fs'
import path from 'path'

export default async function Page({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const MDXContent = (await import('../_articles/' + `${params.slug}.mdx`))
    .default

  return <MDXContent />
}

export async function generateStaticParams() {
  const articles = await fs.readdir(
    path.join(process.cwd(), 'app', 'thoughts', '_articles')
  )

  return articles
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => ({
      params: {
        slug: name.replace(/\.mdx$/, ''),
      },
    }))
}
