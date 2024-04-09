'use client'

import cn from 'clsx'
import { usePathname } from 'next/navigation'
import { Link } from '@/app/_components/transition-link'
import { useBrowserNativeTransitions } from '@/app/_hooks/use-browser-native-transitions'

function Item(props: React.ComponentProps<typeof Link>) {
  const pathname = usePathname()
  const href = props.href

  if (typeof href !== 'string') {
    throw new Error('`href` must be a string')
  }

  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <li
      className={cn(
        isActive ? 'text-rurikon-800 cursor-default' : 'text-rurikon-300',
        'transition-colors'
      )}
    >
      <Link {...props} />
    </li>
  )
}

export default function Navbar() {
  useBrowserNativeTransitions()

  return (
    <nav className='mr-10'>
      <ul className='lowercase text-right'>
        <Item href='/'>About</Item>
        <Item href='/thoughts'>Thoughts</Item>
        <Item href='/projects'>Projects</Item>
      </ul>
    </nav>
  )
}
