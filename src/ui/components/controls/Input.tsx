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
    defaultValue?: string | null;
    id: string;
}

const Input: React.FC<IProps> = (props: IProps) => {
    const { name, label, error, defaultValue, onChange, ...other } = props;

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            onChange={onChange}
            defaultValue={defaultValue}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    );
};

export default Input;
