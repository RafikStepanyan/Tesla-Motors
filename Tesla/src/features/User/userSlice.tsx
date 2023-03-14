import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findAll, findAllByField, findOne } from '../../firebase/Firestore';
import { RootState } from '../../app/store';

export enum Type {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager'
}

export enum EnumCollection {
    USER = 'user',
    CATEGORY = 'category',
    PRODUCTS = 'products',
}

export type UserType = {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    type: Type;
    active: boolean;
};

const initialState: { arr: UserType[], user: UserType | any; } = {
    arr: [],
    user: {},
};

export const getUsersAsync: any = createAsyncThunk(
    'getUsers',
    async ({ done, obj }: { obj?: any, done: boolean; }) => {
        if (done) {
            const res = await findAllByField({ collectionName: EnumCollection.USER, obj });
            return res;
        } else {
            const res = await findAll({ collectionName: EnumCollection.USER });
            return res;
        }
    }
);

export const getUserByIdAsync: any = createAsyncThunk(
    'getUsersById',
    async (id: string) => {
        const res = await findOne({ collectionName: EnumCollection.USER, id });
        return res;
    }
);
export const getUserByEmailAsync: any = createAsyncThunk(
    'getUsersByemail',
    async (obj: any) => {
        const res = await findAllByField({ collectionName: EnumCollection.USER, obj });
        return res[0];
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder: any) => {
        builder.addCase(getUsersAsync.fulfilled, (state: any, action: PayloadAction<UserType[]>) => {
            state.arr = action.payload;
        }).addCase(getUserByIdAsync.fulfilled, (state: any, action: PayloadAction<UserType>) => {
            state.user = action.payload;
        }).addCase(getUserByEmailAsync.fulfilled, (state: any, action: PayloadAction<UserType>) => {
            state.user = action.payload;
        });
    }
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;