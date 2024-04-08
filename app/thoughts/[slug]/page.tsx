import { promises as fs } from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { components } from '@/mdx-components'

export default async function Page({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const filepath = path.join(
    process.cwd(),
    'app',
    'thoughts',
    '_articles',
    `${params.slug}.mdx`
  )

  try {
    if (!(await fs.lstat(filepath)).isFile()) {
      notFound()
    }
  } catch {
    notFound()
  }

  const content = await fs.readFile(filepath, 'utf8')

  return <MDXRemote source={content} components={components} />
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
