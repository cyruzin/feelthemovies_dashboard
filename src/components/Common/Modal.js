// @flow
import * as React from 'react'
import Button from './Button'
import './Modal.css'

type Props = {
    show: boolean,
    title: string,
    children: React.Node,
    closeBtnName: string,
    okBtnName: string,
    onClose: () => any,
    onClick: () => any
}

Modal.defaulProps = {
    closeBtnName: 'Close',
    okBtnName: 'Save'
}

function Modal (props: Props) {
    const { children, title, closeBtnName, okBtnName, onClick, onClose, show } = props
    return (
        <div style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-wrapper text-left">
                <div role="document" className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <strong id="exampleModalLabel" className="modal-title">
                                {title}
                            </strong>
                            <Button
                                type="button"
                                data-dismiss="modal"
                                aria-label="Close"
                                className="close">
                                <span aria-hidden="true">×</span>
                            </Button>
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

                            <Button
                                type="button"
                                onClick={onClose}
                                className="btn btn-secondary" >
                                {closeBtnName}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal