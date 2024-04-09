'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { startTransition, useEffect, useState } from 'react'
import { useSetFinishViewTransition } from '@/app/_components/view-transitions'

export function Link(props: React.ComponentProps<typeof NextLink>) {
  const href = props.href
  if (typeof href !== 'string') throw new Error('`href` must be a string')

  const router = useRouter()
  const finishViewTransition = useSetFinishViewTransition()

  return (
    <NextLink
      {...props}
      onClick={(e) => {
        if ('startViewTransition' in document) {
          e.preventDefault()

          // @ts-ignore
          document.startViewTransition(
            () =>
              new Promise<void>((resolve) => {
                startTransition(() => {
                  router.push(href)
                  finishViewTransition(() => resolve)
                })
              })
          )
        }
      }}
    />
  )
}
