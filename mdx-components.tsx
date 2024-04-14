import type { MDXComponents } from 'mdx/types'
import type { FC } from 'react'
import Link from 'next/link'

import { Card } from '@/app/_components/tweet-card'

export const components: Record<string, FC<any>> = {
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
  blockquote: (props) => <blockquote {...props} />,
  pre: (props) => <pre className='mt-7 whitespace-pre-wrap' {...props} />,
  code: (props) => <code className='inline' {...props} />,
  Card,
}

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  }
}
