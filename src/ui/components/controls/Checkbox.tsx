import React from 'react';
import {
    FormControl,
    Checkbox as MUI_Checkbox,
    FormControlLabel
} from '@material-ui/core';
import { Control, FieldValues, RefCallBack } from 'react-hook-form';

interface IProps {
    name: string;
    label: string;
    error?: Error;
    inputRef: RefCallBack;
    onChange(): void;
    required?: boolean;
    fullWidth?: boolean;
    checked?: boolean | undefined;
    id: string;
    control: Control<FieldValues>;
}

const Checkbox: React.FC<IProps> = (props: IProps) => {
    const { name, error = null, checked, label, onChange, ...other } = props;
    let a = checked;
    if (checked == undefined) {
        a = true;
    }
    return (
        <FormControl>
            <FormControlLabel
                control={
                    <MUI_Checkbox
                        name={name}
                        color="primary"
                        onChange={onChange}
                        checked={a || false}
                        defaultChecked={a}
                        {...other}
                        {...(error && { error: true, helperText: error })}
                    />
                }
                label={label}
            />
        </FormControl>
    );
};

export default Checkbox;
