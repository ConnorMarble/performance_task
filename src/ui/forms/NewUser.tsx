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
import { addUser, updateUser } from '../../redux/userSlice';
import getDistrict from '../../services/getDistrict';
import moment from 'moment';
import getUser from '../../services/getUser';

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
    const selectUsers = useAppSelector((state) => state.users.users);
    const selectSelected = useAppSelector((state) => state.users.selectedUsers);
    const selectUser = getUser(selectSelected[0], selectUsers);

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: IUser) => {
        try {
            if (selectSelected.length > 0) {
                const districtName = await getDistrict(data.district);
                if (districtName && selectUser) {
                    const newUser = {
                        ...data,
                        districtName,
                        id: selectSelected[0],
                        created_at: selectUser.created_at
                    };
                    dispatch(updateUser(newUser));
                    setNotify({
                        isOpen: true,
                        message: 'User Updated!',
                        type: 'success'
                    });
                }
            } else {
                const districtName = await getDistrict(data.district);
                if (districtName) {
                    const newUser = {
                        ...data,
                        districtName: districtName,
                        id: selectUsers.length + 1,
                        verified: false,
                        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
                    };
                    dispatch(addUser(newUser));
                    setNotify({
                        isOpen: true,
                        message: 'User Added!',
                        type: 'success'
                    });
                }
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
                            defaultValue={selectUser && selectUser.first_name}
                            render={({ field: { onChange, ref } }) => (
                                <Controls.Input
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    required
                                    defaultValue={
                                        selectUser && selectUser.first_name
                                    }
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
                            defaultValue={
                                selectUser && selectUser.middle_initial
                                    ? selectUser.middle_initial
                                    : ''
                            }
                            render={({ field: { onChange, ref } }) => (
                                <Controls.Input
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    id="middle_initial"
                                    name="middle_initial"
                                    label="Middle Initial"
                                    defaultValue={
                                        selectUser && selectUser.middle_initial
                                            ? selectUser.middle_initial
                                            : ''
                                    }
                                    fullWidth
                                    error={errors.middle_initial?.message}
                                />
                            )}
                        />
                        <Controller
                            name="last_name"
                            control={control}
                            defaultValue={selectUser && selectUser.last_name}
                            render={({ field: { onChange, ref } }) => (
                                <Controls.Input
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    required
                                    id="last_name"
                                    name="last_name"
                                    label="Last Name"
                                    defaultValue={
                                        selectUser && selectUser.last_name
                                    }
                                    fullWidth
                                    error={errors.last_name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={selectUser && selectUser.email}
                            render={({ field: { onChange, ref } }) => (
                                <Controls.Input
                                    onChange={onChange}
                                    inputRef={ref} // wire up the input ref
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    defaultValue={
                                        selectUser && selectUser.email
                                    }
                                    fullWidth
                                    error={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="active"
                            control={control}
                            defaultValue={
                                selectUser ? selectUser.active : false
                            }
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
                            defaultValue={selectUser && selectUser.district}
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
