import {
    createStyles,
    makeStyles,
    Theme,
    lighten,
    Toolbar,
    Typography,
    Tooltip,
    IconButton
} from '@material-ui/core';
import { Add, Settings } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { IPopUp } from '../../../types';
import DistrictFilter from './DistrictFilter';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import { Controls } from '../controls/Controls';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteUser } from '../../../redux/userSlice';

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1)
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                      color: theme.palette.secondary.main,
                      backgroundColor: lighten(
                          theme.palette.secondary.light,
                          0.85
                      )
                  }
                : {
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.secondary.dark
                  },
        title: {
            flex: '1 1 100%'
        }
    })
);

interface IProps extends IPopUp {
    numSelected: number;
    deleteUsers(): void;
}

const TableToolbar: React.FC<IProps> = ({
    numSelected,
    setOpenPopup,
    deleteUsers
}: IProps) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Users
                </Typography>
            )}
            {numSelected > 0 ? (
                <>
                    <Tooltip title="Delete">
                        <div onClick={() => deleteUsers()}>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Tooltip title="Edit user">
                        <div onClick={() => deleteUsers()}>
                            <IconButton onClick={() => setOpenPopup(true)}>
                                <Settings />
                            </IconButton>
                        </div>
                    </Tooltip>
                </>
            ) : (
                <>
                    <Controls.Switch />
                    <DistrictFilter />
                    <Tooltip title="Add user">
                        <IconButton onClick={() => setOpenPopup(true)}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
};

export default TableToolbar;
