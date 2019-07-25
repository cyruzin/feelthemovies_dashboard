// @flow
import * as React from 'react'

type Props = {
    children: React.Node
}

function TR (props: Props) {
    const { children } = props
    return (
        <tr>
            {children}
        </tr>
    )
}

export default TR