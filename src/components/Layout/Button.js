import React from 'react'

const Button = props => {
    const { title, size, style } = props
    return (
        <button
            className={`btn btn-${style} btn-${size}`}
            {...props}>
            {title}
        </button>
    )
}

export default Button