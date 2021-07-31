import { IDistrict } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IDistrict[] = [];
const districtSlice = createSlice({
    name: 'districts',
    initialState: {
        districts: initialState
    },
    reducers: {
        setDistricts: (state, action: PayloadAction<IDistrict[]>) => {
            state.districts = action.payload;
        }
    }
});

export const { setDistricts } = districtSlice.actions;

export default districtSlice.reducer;
