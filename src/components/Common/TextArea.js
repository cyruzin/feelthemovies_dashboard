// @flow
import React from 'react'

type Props = {
    rows: number
}

TextArea.defaultProps = {
    rows: 4
}

function TextArea (props: Props) {
    const { rows, ...rest } = props
    return <textarea rows={`${rows}`} {...rest}></textarea>
}

export default TextArea