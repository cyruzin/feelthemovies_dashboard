import React from 'react'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
    const { rows = 4, ...rest } = props
    return <textarea rows={rows} ref={ref} {...rest}></textarea>
});

export default TextArea