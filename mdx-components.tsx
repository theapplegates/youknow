import type { MDXComponents } from 'mdx/types'
import type { FC } from 'react'
import Link from 'next/link'
import {
  codeToHtml,
  // createCssVariablesTheme
} from 'shiki'
import Image from 'next/image'

import { Card } from '@/components/tweet-card'
import { BlockSideTitle } from '@/components/block-sidetitle'

// @ts-ignore
import { InlineMath, BlockMath } from 'react-katex'

// const cssVariablesTheme = createCssVariablesTheme({
//   name: 'css-variables',
//   variablePrefix: '--shiki-',
//   variableDefaults: {},
//   fontStyle: true,
// })

export const components: Record<string, FC<any>> = {
  h1: (props) => (
    <h1
      className='font-semibold mb-7 text-rurikon-600 text-balance'
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'
      {...props}
    />
  ),
  a: ({ href, ...props }) => {
    return href?.startsWith('/') ? (
      <Link href={href} {...props} />
    ) : (
      <a
        className='break-words decoration-from-font underline underline-offset-2 decoration-rurikon-300 hover:decoration-rurikon-600 focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-opacity-50 focus-visible:ring-offset-2'
        href={href}
        draggable={false}
        {...(href?.startsWith('#')
          ? {}
          : {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
        {...props}
      />
    )
  },
  strong: (props) => <strong className='font-bold' {...props} />,
  p: (props) => <p className='mt-7' {...props} />,
  blockquote: (props) => <blockquote {...props} />,
  pre: (props) => (
    <pre className='mt-7 whitespace-pre md:whitespace-pre-wrap' {...props} />
  ),
  code: async (props) => {
    if (typeof props.children === 'string') {
      const code = await codeToHtml(props.children, {
        lang: 'jsx',
        // theme: cssVariablesTheme,
        // theme: 'min-light',
        theme: 'snazzy-light',
        transformers: [
          {
            // Since we're using dangerouslySetInnerHTML, the code and pre
            // tags should be removed.
            pre: (hast) => {
              if (hast.children.length !== 1) {
                throw new Error('<pre>: Expected a single <code> child')
              }
              if (hast.children[0].type !== 'element') {
                throw new Error('<pre>: Expected a <code> child')
              }
              return hast.children[0]
            },
            postprocess(html) {
              return html.replace(/^<code>|<\/code>$/g, '')
            },
          },
        ],
      })

      return (
        <code
          className={'inline shiki css-variables'}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      )
    }

    return <code className='inline' {...props} />
  },
  Card,
  Image,
  img: async ({ src, alt, title }) => {
    let img: React.ReactNode

    if (src.startsWith('http')) {
      img = (
        <Image
          className='mt-7'
          src={src}
          alt={alt}
          quality={95}
          placeholder='blur'
          draggable={false}
        />
      )
    } else {
      const image = await import('./assets/images/' + src)
      img = (
        <Image
          className='mt-7'
          src={image.default}
          alt={alt}
          quality={95}
          placeholder='blur'
          draggable={false}
        />
      )
    }

    if (title) {
      return <BlockSideTitle title={title}>{img}</BlockSideTitle>
    }

    return img
  },
  hr: (props) => <hr className='mt-7 w-24 border-rurikon-border' {...props} />,
  BlockSideTitle,
  InlineMath,
  BlockMath,
}

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  }
}
