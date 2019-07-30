// @flow
import React, { useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import AlertContent from './AlertContent'

type Props = {
    message: string,
    variant: string,
    showAlert: boolean
}

function Alert (props: Props) {
    const { showAlert, message, variant } = props
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        handleClick(showAlert)
    }, [showAlert])

    function handleClick (showAlert: boolean) {
        setOpen(showAlert)
    }

    function handleClose (event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <AlertContent
                    onClose={handleClose}
                    // $FlowFixMe
                    variant={variant}
                    message={message}
                />
            </Snackbar>
        </div>
    )
}

export default Alert