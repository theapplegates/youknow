import withMDX from '@next/mdx'

export default withMDX()(
  /** @type {import('next').NextConfig} */ {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    redirects: () => [
      {
        source: '/posts/:slug',
        destination: '/thoughts/:slug',
        permanent: false,
      },
    ],
    experimental: {
      mdxRs: {
        mdxType: 'gfm',
      },
    },
    transpilePackages: ['shiki'],
    images: {
      contentDispositionType: 'inline',
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
  }
)
