import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import AlertContent from './AlertContent';

interface Props {
  message: string;
  variant: string;
  showAlert: boolean;
  onClose: () => any;
}

function Alert(props: Props) {
  const { showAlert, message, variant, onClose } = props;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    handleClick(showAlert);
  }, [showAlert]);

  function handleClick(showAlert: boolean) {
    setOpen(showAlert);
  }

  function handleClose(event: any, reason: string) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    return onClose && onClose();
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <AlertContent
          onClose={handleClose}
          variant={variant as any}
          message={message}
        />
      </Snackbar>
    </div>
  );
}

export default Alert;
