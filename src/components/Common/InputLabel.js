// @flow
import React from 'react'

type Props = {
    label: string
}

function InputLabel (props: Props) {
    const { label } = props
    return (
        <div className="form-group">
            <input type="text" className="input-material" {...props} />
            <label className="label-material">{label}</label>
        </div>
    )
}

export default InputLabel