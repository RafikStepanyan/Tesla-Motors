import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { findAll, findAllByField, findOne } from '../../firebase/Firestore';

export type MainProductType = {
    id: string;
    name: string;
    path: string;
    price: number;
    desc: string;
    peakpower?: string;
    range?: string;
    topspeed?: string;
};

const initialState: { product: MainProductType | any; } = {
    product: {},
};

export const getMainProduct: any = createAsyncThunk(
    'getMainProduct',
    async (pathname: string) => {
        const res = findAllByField({ collectionName: 'mainProduct', obj: { path: pathname } });
        return res;
    }
);

const mainProductSlice = createSlice({
    name: 'mainProduct',
    initialState,
    reducers: {

    },
    extraReducers: (builder: any) => {
        builder.addCase(getMainProduct.fulfilled, (state: any, action: PayloadAction<MainProductType>) => {
            state.product = action.payload;
        });
    }
});

export default mainProductSlice.reducer;