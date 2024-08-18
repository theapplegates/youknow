import cn from 'clsx'

export function BlockSideTitle({
  title,
  children,
}: {
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <figure>
      <span className='inline-block w-full'>
        <span className='sidenote-content float-left w-full'>{children}</span>
      </span>
      <span
        className={cn(
          'sidenote block relative mt-3.5 mb-7 mx-auto text-center text-pretty w-[80%] text-sm leading-7 text-rurikon-400',
          'text:inline text:float-right text:clear-right text:w-[50%] text:-mr-[50%] text:mt-0 text:pl-7 text:text-left'
        )}
      >
        <span className='sr-only'>Sidenote: </span>
        {title}
      </span>
    </figure>
  )
}
