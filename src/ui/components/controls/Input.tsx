import React from 'react';
import { TextField } from '@material-ui/core';
import { RefCallBack } from 'react-hook-form';

interface IProps {
    name: string;
    label: string;
    value?: string;
    error?: Error;
    inputRef: RefCallBack;
    onChange(): void;
    required?: boolean;
    fullWidth?: boolean;
    defaultValue?: string;
    id: string;
}

const Input: React.FC<IProps> = (props: IProps) => {
    const { name, label, error, onChange, defaultValue, ...other } = props;

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    );
};

export default Input;
