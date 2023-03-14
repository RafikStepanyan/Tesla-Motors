import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findAll, findAllByField } from '../../firebase/Firestore';
import { EnumCollection } from '../User/userSlice';

export type CarCategory = {
    id: string;
    name: string;
    child: Array<{ name: string, path: string; }>;
};

export type ShopCategory = {
    id: string;
    name: string;
    child: Array<{
        name: string;
        path: string;
        child: Array<{
            name: string,
            path: string;
        }>;
    }>;
};
const initialState: { arrCar: CarCategory[], arrShop: ShopCategory[]; } = {
    arrCar: [],
    arrShop: [],
};

export const getCarCategory: any = createAsyncThunk(
    'getCarCategory',
    async () => {
        const res = await findAllByField({ collectionName: EnumCollection.CATEGORY, obj: { name: 'car' } });
        return res;
    }
);
export const getShopCategory: any = createAsyncThunk(
    'getshopCategory',
    async () => {
        const res = await findAllByField({ collectionName: EnumCollection.CATEGORY, obj: { name: 'shop' } });
        return res;
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder: any) => {
        builder.addCase(getCarCategory.fulfilled, (state: any, action: PayloadAction<CarCategory[]>) => {
            state.arrCar = action.payload;
        }).addCase(getShopCategory.fulfilled, (state: any, action: PayloadAction<ShopCategory[]>) => {
            state.arrShop = action.payload;
        });
    }
});

export default categorySlice.reducer;