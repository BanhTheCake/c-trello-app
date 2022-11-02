import { configureStore } from '@reduxjs/toolkit';
import broadSlice from './boardSlice';

export const store = configureStore({
    reducer: {
        board: broadSlice,
    },
});
