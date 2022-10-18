import SliceService from '../../services/sliceService';
import StorageService from '../../services/storageService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();
const storageService = new StorageService(localStorage);

const initialState = {
    income: [],
    error: null,
    expenses: [],
    loading: false,
};

export const actionToBudget = createAsyncThunk(
    'budget/actionToBudget',
    async (data, {rejectWithValue}) => {
        const {end, type, year, start, month, currency} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getBudgetLink(null, end, year, start, month, currency)[type], null, type).get();

        return sliceService.switchingByData(opts, response); 
    }
);

export const actionToAddItem = createAsyncThunk(
    'budget/actionToAddItem',
    async (data, {rejectWithValue}) => {
        const {end, type, year, start, month, value, amount, currency, category, description} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getBudgetLink(null, end, year, start, month, currency)[type], {value, currency, amount, category, description}, type).post();

        return sliceService.switchingByData(opts, response); 
    }
);

export const actionToEditItem = createAsyncThunk(
    'budget/actionToEditItem',
    async (data, {rejectWithValue}) => {
        const {id, end, type, year, start, month, value, amount, currency, category, description} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getBudgetLink(null, end, year, start, month, currency)[type], {id, value, currency, amount, category, description}, type).put();

        return sliceService.switchingByData(opts, response); 
    }
);

export const actionToDeleteItem = createAsyncThunk(
    'budget/actionToDeleteItem',
    async (data, {rejectWithValue}) => {
        const {id, end, type, year, start, month, currency} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getBudgetLink(id, end, year, start, month, currency)[type], null, type).delete();

        return sliceService.switchingByData(opts, response); 
    }
);

export const budgetResetStateHandler = createAction('budget/budgetResetStateHandler');

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToBudget.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToDeleteItem.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToAddItem.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToEditItem.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToBudget.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.income = action.payload?.income;
                state.expenses = action.payload?.expenses;
            })
            .addCase(actionToDeleteItem.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.income = action.payload?.income;
                state.expenses = action.payload?.expenses;
            })
            .addCase(actionToAddItem.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.income = action.payload?.income;
                state.expenses = action.payload?.expenses;
            })
            .addCase(actionToEditItem.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.income = action.payload?.income;
                state.expenses = action.payload?.expenses;
            })
            .addCase(budgetResetStateHandler, (state) => {
                Object.assign(state, initialState);
            })
            .addCase(actionToBudget.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                storageService.removeItem('authToken');
            })
            .addCase(actionToDeleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                storageService.removeItem('authToken');
            })
            .addCase(actionToAddItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                storageService.removeItem('authToken');
            })
            .addCase(actionToEditItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                storageService.removeItem('authToken');
            })
    }
});

export default budgetSlice.reducer;