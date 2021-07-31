import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import districtReducer from './districtSlice';

export const store = configureStore({
    reducer: { users: userReducer, districts: districtReducer }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
