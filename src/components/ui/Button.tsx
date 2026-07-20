import Link from 'next/link'
import type { ReactNode } from 'react'

interface BaseButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

interface LinkButtonProps extends BaseButtonProps {
  href: string
}

interface NativeButtonProps extends BaseButtonProps {
  onClick: () => void
  type?: 'button' | 'submit'
}

type ButtonProps = LinkButtonProps | NativeButtonProps

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses = {
  primary: 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40',
  secondary: 'bg-primary-700 hover:bg-primary-800 text-white shadow-lg shadow-primary-700/20',
  outline: 'border-2 border-primary-600 text-primary-100 hover:border-accent-500 hover:text-accent-300',
}

function InnerButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
}: BaseButtonProps) {
  const inner = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  )

  return (
    <span
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {inner}
    </span>
  )
}

export function Button(props: ButtonProps) {
  if ('href' in props) {
    return (
      <Link href={props.href} className="group">
        <InnerButton {...props} />
      </Link>
    )
  }

  return (
    <button onClick={props.onClick} type={props.type || 'button'}>
      <InnerButton {...props} />
    </button>
  )
}
