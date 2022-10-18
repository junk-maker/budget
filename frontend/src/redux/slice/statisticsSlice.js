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

export const actionToStatistics = createAsyncThunk(
    'statistics/actionToStatistics',
    async (data, {rejectWithValue}) => {
        const {end, type, year, start, month, value, currency} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getStatisticsLink(end, year, start, month, value, currency)[type], null, type).get();

        return sliceService.switchingByData(opts, response); 
    } 
);

export const statisticsResetStateHandler = createAction('statistics/statisticsResetStateHandler');

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToStatistics.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToStatistics.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.income = action.payload?.income;
                state.expenses = action.payload?.expenses;
            })
            .addCase(statisticsResetStateHandler, (state) => {
                Object.assign(state, initialState);
            })
            .addCase(actionToStatistics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                storageService.removeItem('authToken');
            })
    }
});

export default statisticsSlice.reducer;