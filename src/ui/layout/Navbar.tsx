import React from 'react';
import { Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        textDecoration: 'none',
        backgroundColor: 'transparent',
        color: 'black',
        padding: '10px'
    },
    navBrand: {
        fontFamily: 'Motor-Oil',
        fontSize: '1.6rem',
        letterSpacing: '6px',
        display: 'inline-block',
        paddingTop: '.3125rem',
        paddingBottom: '.3125rem',
        marginRight: '1rem',
        lineHeight: 'inherit',
        whiteSpace: 'nowrap',
        fontWeight: 600,
        color: 'white'
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
        justifyContent: 'space-between'
    },
    link: {
        color: 'white',
        padding: '10px 0px',
        cursor: 'pointer'
    }
}));

const Navbar: React.FC = () => {
    const classes = useStyles();
    return (
        <nav className={classes.root}>
            <div>
                <a className={classes.navBrand}>inquirED</a>
                <i
                    id="loading-icon"
                    title="Loading..."
                    style={{ display: 'none' }}
                ></i>
                <div className={classes.links}>
                    <Link className={classes.link}>Admin Panel</Link>
                    <Link className={classes.link}>Unit Dashboard</Link>
                    <Link className={classes.link}>Curriculum Library</Link>
                    <Link className={classes.link}>PD & Learning</Link>
                    <Link className={classes.link}>Help</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
