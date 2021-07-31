import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IUser, TSetNotify } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../validation/yup.schema';
import { Grid, Box, makeStyles } from '@material-ui/core';
import Form from './Form';
import { Controls } from '../components/controls/Controls';
import { useEffect } from 'react';
import getDistricts from '../../services/getDistricts';
import { setDistricts } from '../../redux/districtSlice';
import { addUser } from '../../redux/userSlice';
import getDistrict from '../../services/getDistrict';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

interface IProps {
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
    setNotify: TSetNotify;
}

const NewUserForm: React.FC<IProps> = ({ setOpenPopup, setNotify }: IProps) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const selectDistricts = useAppSelector(
        (state) => state.districts.districts
    );
    const {
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: IUser) => {
        try {
            const districtName = await getDistrict(data.district);
            if (districtName) {
                const newUser = {
                    ...data,
                    districtName
                };
                dispatch(addUser(newUser));
                setNotify({
                    isOpen: true,
                    message: 'User Added!',
                    type: 'success'
                });
            }
            reset();
            setOpenPopup(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDistricts().then((data) => dispatch(setDistricts(data)));
    }, []);

    return (
        <Form>
            <Box px={3} py={2} justifyItems="center" width="100%">
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={12} className={classes.root}>
                        <Controller
                            name="first_name"
                            control={control}
                            render={({ field: { onChange, ref } }) => (
                                <Controls.Input
                                    defaultValue={''}
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    required
                                    id="first_name"
                                    name="first_name"
                                    label="First Name"
                                    fullWidth
                                    error={errors.first_name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="middle_initial"
                            control={control}
                            render={({ field: { onChange, ref } }) => (
                                <Controls.Input
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    id="middle_initial"
                                    name="middle_initial"
                                    label="Middle Initial"
                                    defaultValue={''}
                                    fullWidth
                                    error={errors.middle_initial?.message}
                                />
                            )}
                        />
                        <Controller
                            name="last_name"
                            control={control}
                            render={({ field: { onChange, ref } }) => (
                                <Controls.Input
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    required
                                    id="last_name"
                                    name="last_name"
                                    label="Last Name"
                                    defaultValue={''}
                                    fullWidth
                                    error={errors.last_name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { onChange, ref } }) => (
                                <Controls.Input
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    defaultValue={''}
                                    fullWidth
                                    error={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="active"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                                <Controls.Checkbox
                                    label="Active"
                                    name="active"
                                    control={control}
                                    checked={value}
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    id="active"
                                />
                            )}
                        />
                        <Controller
                            name="district"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                                <Controls.Select
                                    value={value}
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    required
                                    id="district"
                                    name="district"
                                    label="District"
                                    fullWidth
                                    options={selectDistricts}
                                    error={errors.district?.message}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Box
                    mt={3}
                    marginLeft="0"
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Controls.Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                        text={'Submit'}
                        type={'submit'}
                    />
                </Box>
            </Box>
        </Form>
    );
};

export default NewUserForm;
