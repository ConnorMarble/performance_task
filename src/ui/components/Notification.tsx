import React, { SetStateAction } from 'react';
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert, AlertProps, Color } from '@material-ui/lab';
import { TNotify, TSetNotify } from '../../types';

const useStyles = makeStyles((theme) => ({
    root: {
        top: theme.spacing(9)
    }
}));

interface IProps {
    notify: TNotify;
    setNotify: TSetNotify;
}

const Notification: React.FC<IProps> = ({ notify, setNotify }: IProps) => {
    const classes = useStyles();

    const handleClose = () => {
        setNotify({
            ...notify,
            isOpen: false
        });
    };

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}
        >
            <Alert severity={notify.type} onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
