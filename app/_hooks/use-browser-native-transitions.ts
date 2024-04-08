'use client'

import { usePathname } from 'next/navigation'
import { useEffect, use } from 'react'

let p: any
let resolveCurrentViewTransition: null | (() => void) = null

// if (typeof window !== 'undefined') {
//   window.onpopstate = (e) => {
//     console.trace(e, Date.now())
//     if (!resolveCurrentViewTransition) {
//       const p = new Promise<void>((resolve) => {
//         resolveCurrentViewTransition = resolve
//       })

//       // @ts-ignore
//       document.startViewTransition(() => p)

//       console.log('transition')
//     }
//   }
// }

export function useBrowserNativeTransitions() {
  const pathname = usePathname()

  useEffect(() => {
    console.log('->', pathname)
    if (resolveCurrentViewTransition) {
      resolveCurrentViewTransition()
      resolveCurrentViewTransition = null
    }
  }, [pathname])

  if (!resolveCurrentViewTransition) {
    p = new Promise<void>((resolve) => {
      resolveCurrentViewTransition = resolve
    })

    // @ts-ignore
    document.startViewTransition(() => p)

    console.log('transition')
  }

  use(p)
}
