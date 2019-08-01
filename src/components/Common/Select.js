// @flow
import * as React from 'react'

type Props = {
    children: React.Node
}

function Select (props: Props) {
    const { children, ...rest } = props
    return (
        <select {...rest}>
            {children}
        </select>
    )
}

export default Select