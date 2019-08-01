// @flow
import * as React from 'react'

type Props = {
    children: React.Node
}

function Option (props: Props) {
    const { children, ...rest } = props
    return <option {...rest}>{children}</option>
}

export default Option