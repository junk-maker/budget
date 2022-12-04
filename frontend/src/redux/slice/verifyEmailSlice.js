import SliceService from '../../services/sliceService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();

const initialState = {
    error: null,
    loading: false,
    connection: null,
    verification: null,
};

export const actionToVerifyEmail = createAsyncThunk(
    'verifyEmail/actionToVerifyEmail',
    async (data, {rejectWithValue}) => {
        const {type, token} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getVerifyEmailLink(token)[type], null, type).get();

        return sliceService.switchingByData(opts, response);
    }
);

export const dataVerification = createAsyncThunk(
    'verifyEmail/dataVerification',
    async (data, {rejectWithValue}) => {
        const {type, token} = data;
        let opts = {rejectWithValue};
        let response = await sliceService.getApi(sliceService.getVerifyEmailLink(token)[type], {token}, type).post();
        
        return sliceService.switchingByData(opts, response);
    }
);

export const resetEmailVerificationStateHandler = createAction('verifyEmail/resetEmailVerificationStateHandler');

const verifyEmailSlice = createSlice({
    name: 'verifyEmail',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToVerifyEmail.pending, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(actionToVerifyEmail.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.connection = action.payload;
            })
            .addCase(dataVerification.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.connection = null;
            })
            .addCase(dataVerification.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.verification = action.payload;
            })
            .addCase(actionToVerifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(dataVerification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetEmailVerificationStateHandler, (state) => {
                Object.assign(state, initialState);
            })
    }
});

export default verifyEmailSlice.reducer;