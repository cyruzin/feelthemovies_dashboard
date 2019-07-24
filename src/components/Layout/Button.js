import React from 'react'

const Button = props => {
    const { title, size, style, children } = props
    return (
        <button
            className={`btn btn-${style} btn-${size}`}
            {...props}>
            {title} {children}
        </button>
    )
}

export default Button