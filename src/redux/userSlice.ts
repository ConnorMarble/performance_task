import { IUser } from "./../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import filterByDistrict from "../helpers/filterByDistrict";
import filterByActive from "../helpers/filterByActive";

const initialState: IUser[] = [];
const initialState2: number[] = [];

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: initialState,
        deleted: initialState2,
        filtered: initialState,
        isFiltered: false,
        filterByActive: false,
        district: 0,
    },
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
            state.users = state.users.filter(
                (user) => state.deleted.indexOf(user.id) == -1
            );
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.deleted = [...state.deleted, action.payload];
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        },
        filterDistrict: (state) => {
            let arr = state.users;
            if (state.filterByActive) {
                arr = filterByActive(arr);
            }
            arr = filterByDistrict(arr, state.district);
            state.filtered = arr;
        },
        filterActiveUsers: (state) => {
            let arr = state.users;
            if (state.district > 0) {
                arr = filterByDistrict(arr, state.district);
            }
            arr = filterByActive(arr);
            state.filtered = arr;
        },
        addUser: (state, action: PayloadAction<IUser>) => {
            const {
                first_name,
                middle_initial,
                last_name,
                email,
                active,
                district,
            } = action.payload;
            const newUser: IUser = {
                id: state.users.length + 1,
                first_name,
                middle_initial,
                last_name,
                email,
                active,
                district,
                verified: false,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            };
            state.users = [...state.users, newUser];
        },
        setFilteredByActive: (state, action: PayloadAction<boolean>) => {
            state.filterByActive = action.payload;
        },
        setDistrict: (state, action: PayloadAction<number>) => {
            state.district = action.payload;
        },
        setIsFiltered: (state, action: PayloadAction<boolean>) => {
            state.isFiltered = action.payload;
        },
    },
});

export const {
    addUser,
    deleteUser,
    filterActiveUsers,
    filterDistrict,
    setDistrict,
    setIsFiltered,
    setFilteredByActive,
    setUsers,
} = userSlice.actions;

export default userSlice.reducer;
