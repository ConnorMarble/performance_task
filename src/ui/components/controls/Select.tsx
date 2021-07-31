import React from 'react';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select as MUI_Select
} from '@material-ui/core';
import { RefCallBack } from 'react-hook-form';

interface IProps {
    name: string;
    label: string;
    value: number;
    error?: Error[];
    inputRef: RefCallBack;
    onChange(): void;
    required?: boolean;
    fullWidth?: boolean;
    defaultValue?: string | number;
    id: string;
    options: {
        name: string;
        id: number;
    }[];
}

const Select: React.FC<IProps> = (props: IProps) => {
    const { name, label, value, error, onChange, options, ...other } = props;
    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MUI_Select
                label={label}
                name={name}
                value={value || ''}
                onChange={onChange}
                {...other}
                {...(error && { error: true })}
            >
                {options.map((item, idx) => (
                    <MenuItem key={idx} value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
            </MUI_Select>
            {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
    );
};

export default Select;
