import { IUser } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState: IUser[] = [];

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: initialState,
        isFiltered: false,
        filterByActive: false,
        district: '',
        filterByDistrict: false
    },
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        },
        addUser: (state, action: PayloadAction<IUser>) => {
            const {
                first_name,
                middle_initial,
                last_name,
                email,
                active,
                district,
                districtName
            } = action.payload;
            const newUser: IUser = {
                id: state.users.length + 1,
                first_name,
                middle_initial,
                last_name,
                email,
                active,
                district,
                districtName,
                verified: false,
                created_at: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            state.users = [...state.users, newUser];
        },
        setFilteredByActive: (state, action: PayloadAction<boolean>) => {
            state.filterByActive = action.payload;
        },
        setDistrict: (state, action: PayloadAction<string>) => {
            state.district = action.payload;
        },
        setFilteredByDistrict: (state, action: PayloadAction<boolean>) => {
            state.filterByDistrict = action.payload;
        }
    }
});

export const {
    addUser,
    deleteUser,
    setFilteredByDistrict,
    setDistrict,
    setFilteredByActive,
    setUsers
} = userSlice.actions;

export default userSlice.reducer;
