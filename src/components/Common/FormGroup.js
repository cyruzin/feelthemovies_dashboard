// @flow

import * as React from 'react'

type Props = {
    label?: string,
    size?: number,
    children: React.Node,
}

FormGroup.defaultProps = {
    size: 9
}

function FormGroup (props: Props) {
    const { label, size, children } = props
    return (
        <>
            <div className="form-group row">
                <label className="col-lg-3 form-control-label">
                    {label}
                </label>
                <div className={`col-lg-${size}`}>
                    {children}
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}

export default FormGroup