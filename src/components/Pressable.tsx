import React, { forwardRef } from 'react'

export type IPressableProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'ref'
> & {
  icon?: boolean
  animateHover?: boolean
}

export const Pressable = forwardRef<HTMLButtonElement, IPressableProps>(
  ({ className = '', children, icon, animateHover = true, ...props }, ref) => {
    return (
      <button
        type="button"
        ref={ref}
        className={`pressable ${icon ? 'pressable--icon' : ''} ${animateHover ? 'pressable--animated-hover' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)
