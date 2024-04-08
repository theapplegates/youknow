import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export const components: Record<
  string,
  (props: Record<string, any>) => React.ReactNode
> = {
  h1: (props) => (
    <h1
      className='font-semibold mb-7 text-rurikon-600 text-balance'
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className='font-semibold my-7 text-rurikon-600 text-balance'
      {...props}
    />
  ),
  a: ({ href, ...props }) =>
    href?.startsWith('/') ? (
      <Link href={href} {...props} />
    ) : (
      <a
        className='break-words decoration-from-font underline underline-offset-2 decoration-zinc-400 hover:decoration-zinc-600'
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        {...props}
      />
    ),
  p: (props) => <p className='mt-7' {...props} />,
}

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  }
}
