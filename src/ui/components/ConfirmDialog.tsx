import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    makeStyles,
    IconButton
} from '@material-ui/core';
import { Controls } from './controls/Controls';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { TConfirmDialog, TSetConfirmDialog, TSetNotify } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { deleteUser } from '../../redux/userSlice';

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    }
}));

interface IProps {
    confirmDialog: TConfirmDialog;
    setConfirmDialog: TSetConfirmDialog;
    setNotify: TSetNotify;
}

const ConfirmDialog: React.FC<IProps> = ({
    confirmDialog,
    setConfirmDialog,
    setNotify
}: IProps) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">{confirmDialog.title}</Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                    text="No"
                    type="button"
                    color="default"
                    onClick={() =>
                        setConfirmDialog({ ...confirmDialog, isOpen: false })
                    }
                />
                <Controls.Button
                    text="Yes"
                    color="secondary"
                    type="button"
                    onClick={() => {
                        confirmDialog.selectedUsers.map((user) =>
                            dispatch(deleteUser(user))
                        );
                        //     setSelected([]);
                        setNotify({
                            isOpen: true,
                            message: 'Deleted Successfully!',
                            type: 'error'
                        });
                        setConfirmDialog({ ...confirmDialog, isOpen: false });
                        // }
                    }}
                />
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
