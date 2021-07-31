import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setFilteredByDistrict, setDistrict } from '../../../redux/userSlice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            marginBottom: '32px'
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

const DistrictFilter: React.FC = () => {
    const classes = useStyles();
    const selectDistricts = useAppSelector(
        (state) => state.districts.districts
    );
    const selectDistrict = useAppSelector((state) => state.users.district);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(setFilteredByDistrict(true));
        dispatch(setDistrict(event.target.value as string));
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>District</InputLabel>
                <Select value={selectDistrict} onChange={handleChange}>
                    {selectDistricts.map((district) => (
                        <MenuItem key={district.id} value={district.name}>
                            {district.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default DistrictFilter;
