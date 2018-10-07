import React from 'react'

const Alert = props => (
    <div className="form-group row">
        <div className="col-lg-12">
            <label className={`form-control-label text-${props.type}`}>
                {props.message}
            </label>
        </div>
    </div>
)

export default Alert