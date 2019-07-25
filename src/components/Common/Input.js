import React from 'react'

const Input = props => {
    const { label } = props
    return (
        <div className="form-group">
            <input type="text" className="input-material" {...props} />
            <label className="label-material">{label}</label>
        </div>
    )
}

export default Input