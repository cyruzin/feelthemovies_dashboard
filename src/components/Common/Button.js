// @flow
import * as React from 'react'

type Props = {
    children?: React.Node,
    className: string
}

Button.defaultProps = {
    className: 'btn btn-primary',
    children: 'Ok'
}

function Button (props: Props) {
    const { className, children } = props
    return (
        <button className={className} {...props}>
            {children}
        </button>
    )
}

export default Button