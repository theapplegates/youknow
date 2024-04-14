'use client'

export function Card({
  image,
  title,
  desc,
  link,
}: {
  image: string
  title: string
  desc: string
  link: string
}) {
  return (
    <a
      href={link}
      target='_blank'
      className='block rounded-lg overflow-clip select-none border border-rurikon-100/70 my-7'
    >
      <img
        src={image}
        className='m-0 aspect-[1.9/1] object-cover border-b border-rurikon-100/70'
      />
      <p className='m-4 mb-1 font-semibold'>{title}</p>
      <p className='m-4 mt-1 opacity-80 text-sm'>{desc}</p>
    </a>
  )
}
