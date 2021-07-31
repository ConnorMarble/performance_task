import React, { useState } from 'react';
import PageHeader from './PageHeader';
import { PeopleOutlineTwoTone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import Popup from './Popup';
import NewUserForm from '../forms/NewUser';
import Table from './table/Table';
import Notification from './Notification';
import { Color } from '@material-ui/lab';
import ConfirmDialog from './ConfirmDialog';
import { useAppSelector } from '../../redux/hooks';

const useStyles = makeStyles(() => ({
    pageContent: {
        justifyContent: 'center',
        display: 'flex'
    },
    searchInput: {
        width: '75%'
    }
}));

const Users: React.FC = () => {
    const classes = useStyles();
    const selectSelected = useAppSelector((state) => state.users.selectedUsers);
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: 'error' as Color
    });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        subTitle: ''
    });

    return (
        <>
            <PageHeader
                title="Users"
                subTitle="List of users."
                icon={<PeopleOutlineTwoTone fontSize="large" />}
            />
            <div className={classes.pageContent}>
                <Table
                    setOpenPopup={setOpenPopup}
                    setNotify={setNotify}
                    setConfirmDialog={setConfirmDialog}
                />
            </div>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title={selectSelected.length > 0 ? 'Edit User' : 'Add New User'}
            >
                <NewUserForm
                    setOpenPopup={setOpenPopup}
                    setNotify={setNotify}
                />
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                setNotify={setNotify}
            />
        </>
    );
};

export default Users;
