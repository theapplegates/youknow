import withMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeShiki from '@shikijs/rehype'

export default withMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          themes: 'vitesse-dark',
          langs: ['javascript', 'typescript', 'css', 'html', 'json', 'bash'],
        },
      ],
    ],
  },
})(
  /** @type {import('next').NextConfig} */ {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
      mdxRs: true,
    },
    redirects: () => [
      {
        source: '/posts/:slug',
        destination: '/thoughts/:slug',
        permanent: false,
      },
    ],
  }
)
