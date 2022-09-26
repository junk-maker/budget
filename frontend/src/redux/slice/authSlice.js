import SliceService from '../../services/sliceService';
import StorageService from '../../services/storageService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();
const storageService = new StorageService(localStorage);

const initialState = {
    error: null,
    loading: false,
    register: null,
    token: storageService.getItem('authToken'),
};

export const actionToSignIn = createAsyncThunk(
    'auth/actionToSignIn',
    async (data, {rejectWithValue}) => {
        const {type, email, password, navigate} = data;
        let opts = {navigate, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getAuthLink()[type], {email, password}, type).post();

        return sliceService.authStatementLogic(type, opts, response);
    }
);

export const actionToSignUp = createAsyncThunk(
    'auth/actionToSignUp',
    async (data, {rejectWithValue}) => {
        const {type, name, email, password, navigate} = data;
        let opts = {navigate, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getAuthLink()[type], {name, email, password}, type).post();

        return sliceService.authStatementLogic(type, opts, response);
    }
);

export const authResetStateHandler = createAction('auth/authResetStateHandler');

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToSignIn.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToSignUp.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToSignIn.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                storageService.setItem('authToken', action.payload);
            })
            .addCase(actionToSignUp.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.register = action.payload[1];
            })
            .addCase(authResetStateHandler, (state) => {
                Object.assign(state, initialState);
            })
            .addCase(actionToSignIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(actionToSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default authSlice.reducer;