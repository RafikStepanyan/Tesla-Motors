import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice';
import categoryReducer from '../features/Category/categorySlice';
import mainProductReducer from '../features/mainProduct/mainProductSlice';
import productReducer from '../features/product/productSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    mainProduct: mainProductReducer,
    product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


