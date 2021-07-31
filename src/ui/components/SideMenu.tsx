import React from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from '../layout/Navbar';

const useStyles = makeStyles((theme) => {
    return {
        sideMenu: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: '0px',
            width: '320px',
            height: '100%',
            minHeight: '100vh',
            backgroundColor: theme.palette.primary.main
        }
    };
});

const SideMenu: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.sideMenu}>
            <Navbar></Navbar>
        </div>
    );
};

export default SideMenu;
