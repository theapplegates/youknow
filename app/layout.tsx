import type { Metadata, Viewport } from 'next'

import cn from 'clsx'
import localFont from 'next/font/local'
import { ViewTransitions } from 'next-view-transitions'
import 'katex/dist/katex.min.css'

import './globals.css'
import Navbar from '@/components/navbar'

const sans = localFont({
  src: './_fonts/InterVariable.woff2',
  preload: true,
  variable: '--sans',
})

const serif = localFont({
  src: './_fonts/LoraItalicVariable.woff2',
  preload: true,
  variable: '--serif',
})

const mono = localFont({
  src: './_fonts/IosevkaFixedCurly-ExtendedMedium.woff2',
  preload: true,
  variable: '--mono',
})

export const metadata: Metadata = {
  title: 'Shu Ding',
}

export const viewport: Viewport = {
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang='en'>
        <body
          className={cn(
            sans.variable,
            serif.variable,
            mono.variable,
            'container p-6 sm:p-10 md:p-14 mx-auto',
            'text-sm leading-6 sm:text-[15px] sm:leading-7 md:text-base md:leading-7',
            'text-rurikon-500',
            'antialiased'
          )}
        >
          <div className='flex'>
            <Navbar />
            <main className='relative flex-1 max-w-2xl [contain:inline-size]'>
              <div className='absolute w-px h-full bg-rurikon-border left-0' />
              <article className='pl-6 sm:pl-10 md:pl-14'>{children}</article>
            </main>
          </div>
        </body>
      </html>
    </ViewTransitions>
  )
}
