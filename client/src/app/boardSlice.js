import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialData } from '../data/initialData';
import _ from 'lodash';

const boardExample = 'board-1';

const initialState = {
    board: {
        _id: '',
        columnOrder: []
    },
    columns: [],
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard(state, action) {
            const newBoard = action.payload;
            return {
                ...state,
                board: newBoard,
            };
        },
        setColumns(state, action) {
            const newColumns = action.payload;
            return {
                ...state,
                columns: newColumns,
            };
        },
        setColumnsOrder(state, action) {
            let currentBoard = action.payload;
            return {
                ...state,
                board: {
                    ...state.board,
                    columnOrder: currentBoard
                },
            };
        },
        setEachColumn(state, action) {
            let currentColumns = [...state.columns];
            const currentColumn = action.payload;
            const currentColumnIndex = currentColumns.findIndex(column => column._id === currentColumn._id)
            currentColumns.splice(currentColumnIndex, 1, currentColumn)
            return {
                ...state,
                columns: currentColumns,
            };
        },
    },
});

export const { setBoard, setColumns, setColumnsOrder, setEachColumn } =
    boardSlice.actions;

export default boardSlice.reducer;
