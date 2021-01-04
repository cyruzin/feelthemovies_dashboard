import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    label?: string;
}

const InputLabel = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { type, label, ...rest } = props
    return (
        <div className="form-group">
            <input type={type} className="input-material" ref={ref} {...rest} />
            <label className="label-material">{label}</label>
        </div>
    )
});

export default InputLabel;