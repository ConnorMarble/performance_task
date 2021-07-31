import { IUser } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUser[] = [];
const initialSelected: number[] = [];

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: initialState,
        isFiltered: false,
        filterByActive: false,
        district: '',
        filterByDistrict: false,
        selectedUsers: initialSelected
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
            state.users = [...state.users, action.payload];
        },
        updateUser: (state, action: PayloadAction<IUser>) => {
            state.users = state.users.map((user) => {
                if (user.id == action.payload.id) {
                    user = action.payload;
                }
                return user;
            });
        },
        setFilteredByActive: (state, action: PayloadAction<boolean>) => {
            state.filterByActive = action.payload;
        },
        setDistrict: (state, action: PayloadAction<string>) => {
            state.district = action.payload;
        },
        setFilteredByDistrict: (state, action: PayloadAction<boolean>) => {
            state.filterByDistrict = action.payload;
        },
        addSelectedUsers: (state, action: PayloadAction<number>) => {
            state.selectedUsers.push(action.payload);
        },
        setSelectedUsers: (state, action: PayloadAction<number[]>) => {
            state.selectedUsers = action.payload;
        }
    }
});

export const {
    addSelectedUsers,
    addUser,
    deleteUser,
    setFilteredByDistrict,
    setDistrict,
    setFilteredByActive,
    setSelectedUsers,
    setUsers,
    updateUser
} = userSlice.actions;

export default userSlice.reducer;
