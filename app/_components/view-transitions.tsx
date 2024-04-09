'use client'

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useEffect,
  use,
} from 'react'

const ViewTransitionsContext = createContext<
  Dispatch<SetStateAction<(() => void) | null>>
>(() => () => {})

export function ViewTransitions({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [finishViewTransition, setFinishViewTransition] = useState<
    null | (() => void)
  >(null)

  useEffect(() => {
    if (finishViewTransition) {
      finishViewTransition()
      setFinishViewTransition(null)
    }
  }, [finishViewTransition])

  return (
    <ViewTransitionsContext.Provider value={setFinishViewTransition}>
      {children}
    </ViewTransitionsContext.Provider>
  )
}

export function useSetFinishViewTransition() {
  return use(ViewTransitionsContext)
}
