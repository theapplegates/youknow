'use client'

import cn from 'clsx'
import { usePathname } from 'next/navigation'
import { Link } from 'next-view-transitions'

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
        isActive
          ? 'text-rurikon-800'
          : 'text-rurikon-300 hover:text-rurikon-500',
        'transition-colors',
        '-mx-2'
      )}
    >
      <Link {...props} className='inline-block w-full px-2' draggable={false} />
    </li>
  )
}

export default function Navbar() {
  return (
    <nav className='mr-6 sm:mr-10 md:mr-14'>
      <ul className='lowercase text-right sticky top-6 sm:top-10 md:top-14'>
        <Item href='/'>About</Item>
        <Item href='/thoughts'>Thoughts</Item>
        {/* <Item href='/visuals'>Visuals</Item> */}
        <Item href='/projects'>Projects</Item>
        {/* <Item href='/guestbook'>Guestbook</Item> */}
      </ul>
    </nav>
  )
}
