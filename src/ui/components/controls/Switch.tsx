import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch as MuiSwitch } from '@material-ui/core/';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setFilteredByActive } from '../../../redux/userSlice';

const Switch: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectByActive = useAppSelector(
        (state) => state.users.filterByActive
    );

    const handleChange = (event: React.ChangeEvent<{ checked: unknown }>) => {
        dispatch(setFilteredByActive(event.target.checked as boolean));
    };

    return (
        <FormControlLabel
            control={
                <MuiSwitch
                    onChange={(e) => handleChange(e)}
                    name="checkedA"
                    color="primary"
                    checked={selectByActive}
                />
            }
            label="Active"
        />
    );
};

export default Switch;
