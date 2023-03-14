import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { findAll, findAllByField, findOne } from '../../firebase/Firestore';

export type productType = {
    id: string;
    name: string;
    count: number;
    price: number;
    desc: string;
};

const initialState: { product: productType[] | any; editProduct: productType | any; } = {
    product: [],
    editProduct: {},
};

export const getProduct: any = createAsyncThunk(
    'getProduct',
    async (managerId: string) => {
        const res = findAllByField({ collectionName: 'products', obj: { managerId: managerId } });
        return res;
    }
);

export const getProductByCategory: any = createAsyncThunk(
    'getProductByCategory',
    async (category: string) => {
        const res = findAllByField({ collectionName: 'products', obj: { category: category } });
        return res;
    }
);

export const getAllProduct: any = createAsyncThunk(
    'getAllProduct',
    async () => {
        const res = findAll({ collectionName: 'products' });
        return res;
    }
);

export const getOneProduct: any = createAsyncThunk(
    'getOneProduct',
    async (id: string) => {
        const res = findOne({ collectionName: 'products', id: id });
        return res;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder: any) => {
        builder.addCase(getProduct.fulfilled, (state: any, action: PayloadAction<productType>) => {
            state.product = action.payload;
        }).addCase(getOneProduct.fulfilled, (state: any, action: PayloadAction<productType>) => {
            state.editProduct = action.payload;
        }).addCase(getAllProduct.fulfilled, (state: any, action: PayloadAction<productType>) => {
            state.product = action.payload;
        }).addCase(getProductByCategory.fulfilled, (state: any, action: PayloadAction<productType>) => {
            state.product = action.payload;
        });
    }
});

export default productSlice.reducer;