import React from 'react'

interface Props {
    children: React.ReactNode;
}

function TR(props: Props) {
    const { children } = props
    return (
        <tr>
            {children}
        </tr>
    )
}

export default TR