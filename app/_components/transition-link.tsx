'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'

export function Link(props: React.ComponentProps<typeof NextLink>) {
  const router = useRouter()
  const href = props.href

  if (typeof href !== 'string') {
    throw new Error('`href` must be a string')
  }

  return (
    <NextLink
      {...props}
      onClick={(e) => {
        e.preventDefault()

        // @ts-ignore
        document.startViewTransition(
          () =>
            new Promise((resolve) => {
              startTransition(() => {
                router.push(href)
                resolve(void 0)
              })
            })
        )
      }}
    />
  )
}
