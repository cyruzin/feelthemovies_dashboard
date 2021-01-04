import React from 'react'

interface Props {
    children: React.ReactNode;
}

function TD(props: Props) {
    const { children } = props
    return (
        <td>
            {children}
        </td>
    )
}

export default TD