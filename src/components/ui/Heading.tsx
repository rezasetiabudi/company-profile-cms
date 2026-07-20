import React from 'react'

interface HeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4
  className?: string
}

const sizeMap = {
  1: 'text-4xl md:text-5xl lg:text-6xl',
  2: 'text-3xl md:text-4xl',
  3: 'text-xl md:text-2xl',
  4: 'text-lg md:text-xl',
}

export function Heading({ children, level = 2, className = '' }: HeadingProps) {
  return React.createElement(
    `h${level}`,
    {
      className: `font-heading font-bold text-gray-900 tracking-tight ${sizeMap[level]} ${className}`,
    },
    children,
  )
}
