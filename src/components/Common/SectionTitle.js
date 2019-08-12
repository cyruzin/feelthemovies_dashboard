// @flow
import React from 'react'

type Props = {
    title: string
}

function SectionTitle (props: Props) {
    const { title } = props
    return (
        <div className="title">
            <strong>{title}</strong>
        </div>
    )
}

export default SectionTitle