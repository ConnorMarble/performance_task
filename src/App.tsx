import { CssBaseline, makeStyles } from '@material-ui/core';
import React from 'react';
import Header from './ui/components/Header';
import SideMenu from './ui/components/SideMenu';
import Users from './ui/components/Users';

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        height: '100%',
        position: 'relative'
    }
});

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.appMain}>
            <SideMenu />
            <Header />
            <Users />
            <CssBaseline />
        </div>
    );
};

export default App;
