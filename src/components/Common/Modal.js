// @flow
import * as React from 'react'
import Button from './Button'
import './Modal.css'

type Props = {
    show: boolean,
    title: string,
    children: React.Node,
    showCloseBtn: boolean,
    closeBtnName: string,
    okBtnName: string,
    onClick: () => any,
    onClose: () => any
}

Modal.defaultProps = {
    showCloseBtn: true,
    closeBtnName: 'Close',
    okBtnName: 'Save',
}

function Modal (props: Props) {
    const {
        show,
        title,
        children,
        closeBtnName,
        showCloseBtn,
        okBtnName,
        onClick,
        onClose
    } = props

    return (
        <div style={{ display: show ? 'block' : 'none' }} className="modal-wrapper text-left">
            <div role="document" className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <strong className="modal-title">
                            {title}
                        </strong>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <Button
                            type="button"
                            onClick={onClick}
                            className="btn btn-primary">
                            {okBtnName}
                        </Button>

                        {showCloseBtn && <Button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary">
                            {closeBtnName}
                        </Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal