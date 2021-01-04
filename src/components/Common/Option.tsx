import React from 'react'

interface Props {
    children: React.ReactNode;
}

function Option(props: Props) {
    const { children, ...rest } = props
    return <option {...rest}>{children}</option>
}

export default Option