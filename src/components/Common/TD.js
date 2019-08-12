// @flow
import * as React from 'react'

type Props = {
    children: React.Node
}

function TD (props: Props) {
    const { children } = props
    return (
        <td>
            {children}
        </td>
    )
}

export default TD