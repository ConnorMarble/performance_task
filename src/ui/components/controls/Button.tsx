import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}));

interface IProps {
    text: string;
    size?: 'medium' | 'large' | 'small' | undefined;
    color?: 'inherit' | 'default' | 'primary' | 'secondary' | undefined;
    variant?: 'text' | 'outlined' | 'contained' | undefined;
    onClick(): void;
    type: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<IProps> = (props: IProps) => {
    const { text, type, size, color, variant, onClick, ...other } = props;
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || 'contained'}
            size={size || 'large'}
            color={color || 'primary'}
            onClick={onClick}
            {...other}
            type={type}
            classes={{ root: classes.root, label: classes.label }}
        >
            {text}
        </MuiButton>
    );
};

export default Button;
