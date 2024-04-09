'use client'

import { usePathname } from 'next/navigation'
import { useEffect, use, useRef } from 'react'

let viewTransitionPendingPromise: null | Promise<void> = null
let resolveCurrentViewTransition: null | (() => void) = null

if (typeof window !== 'undefined' && 'startViewTransition' in document) {
  window.onpopstate = () => {
    if (!resolveCurrentViewTransition) {
      const p = new Promise<void>((resolve) => {
        resolveCurrentViewTransition = resolve
      })

      viewTransitionPendingPromise = new Promise((resolve) => {
        // @ts-ignore
        document.startViewTransition(() => {
          resolve()
          return p
        })
      })
    }
  }
}

export function useBrowserNativeTransitions() {
  const pathname = usePathname()
  const currentPathname = useRef(pathname)

  if (viewTransitionPendingPromise && currentPathname.current !== pathname) {
    use(viewTransitionPendingPromise)
  }

  useEffect(() => {
    currentPathname.current = pathname
    if (resolveCurrentViewTransition) {
      resolveCurrentViewTransition()
      resolveCurrentViewTransition = null
    }
  }, [pathname])
}
