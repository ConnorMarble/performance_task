import {
    createStyles,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { ReactNode } from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
        item: {
            padding: 0
        }
    })
);

interface IProps {
    title: string;
    children: ReactNode;
    openPopup: boolean;
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<IProps> = ({
    title,
    children,
    openPopup,
    setOpenPopup
}: IProps) => {
    const classes = useStyles();

    return (
        <Dialog open={openPopup} fullWidth>
            <DialogTitle>
                <div className={classes.root}>
                    <div>{title}</div>
                    <div onClick={() => setOpenPopup(false)}>
                        <IconButton className={classes.item}>
                            <Close />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default Popup;
