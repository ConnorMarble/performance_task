import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Table as MuiTable } from '@material-ui/core/';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import {
    IPopUp,
    IUser,
    Order,
    TSetConfirmDialog,
    TSetNotify
} from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import getUsers from '../../../services/getUsers';
import { setSelectedUsers, setUsers } from '../../../redux/userSlice';
import getDistricts from '../../../services/getDistricts';
import { setDistricts } from '../../../redux/districtSlice';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import { headCells } from './headerCells';
import TableBody from './TableBody';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '90%'
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2)
        },
        table: {
            minWidth: 750,
            maxHeight: '700px'
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1
        }
    })
);

interface IProps extends IPopUp {
    setNotify: TSetNotify;
    setConfirmDialog: TSetConfirmDialog;
}

const Table: React.FC<IProps> = ({
    setOpenPopup,
    setConfirmDialog
}: IProps) => {
    const classes = useStyles();
    const selectUsers = useAppSelector((state) => state.users.users);
    const selectDistrict = useAppSelector((state) => state.users.district);
    const selectByDistrict = useAppSelector(
        (state) => state.users.filterByDistrict
    );
    const selectByActive = useAppSelector(
        (state) => state.users.filterByActive
    );
    const selectSelected = useAppSelector((state) => state.users.selectedUsers);
    const dispatch = useAppDispatch();
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof IUser>('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [userList, setUserList] = useState<IUser[]>(selectUsers);

    //Fetch the users and the districts and store them in Redux
    useEffect(() => {
        getUsers()
            .then((users) => dispatch(setUsers(users)))
            .then((users) => setUserList(users.payload));
        getDistricts().then((districts) => dispatch(setDistricts(districts)));
    }, []);

    //Watch for newly added users.
    useEffect(() => {
        setUserList(selectUsers);
        dispatch(setSelectedUsers([]));
    }, [selectUsers]);

    //Handles filtering (Not sorting) of districts and active users
    useEffect(() => {
        let filtered = selectUsers;
        if (selectByActive) {
            filtered = filtered.filter((user) => user.active == true);
        }
        if (selectByDistrict) {
            filtered = filtered.filter(
                (user) => user.districtName == selectDistrict
            );
        }
        setUserList(filtered);
    }, [selectByActive, selectByDistrict, selectDistrict, selectUsers]);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IUser
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    //Handle clicking users
    const isSelected = (id: number) => selectSelected.indexOf(id) !== -1;

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelecteds = selectUsers.map((n) => n.id);
            dispatch(setSelectedUsers(newSelecteds));
            return;
        }
        dispatch(setSelectedUsers([]));
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selectSelected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectSelected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectSelected.slice(1));
        } else if (selectedIndex === selectSelected.length - 1) {
            newSelected = newSelected.concat(selectSelected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectSelected.slice(0, selectedIndex),
                selectSelected.slice(selectedIndex + 1)
            );
        }

        dispatch(setSelectedUsers(newSelected));
    };

    //Handle pagination
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, userList.length - page * rowsPerPage);

    //Handles deleting users
    const deleteUsers = () => {
        setConfirmDialog({
            isOpen: true,
            title: 'Are you sure you want to delete this user?',
            subTitle: "You can't undo this operation."
        });
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableToolbar
                    numSelected={selectSelected.length}
                    setOpenPopup={setOpenPopup}
                    deleteUsers={deleteUsers}
                />
                <TableContainer className={classes.table}>
                    <MuiTable
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <TableHeader
                            classes={classes}
                            numSelected={selectSelected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={selectUsers.length}
                            headCells={headCells}
                        />
                        <TableBody
                            page={page}
                            rowsPerPage={rowsPerPage}
                            users={userList}
                            order={order}
                            orderBy={orderBy}
                            isSelected={isSelected}
                            handleClick={handleClick}
                            emptyRows={emptyRows}
                        />
                    </MuiTable>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};
export default Table;
