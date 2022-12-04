import SliceService from '../../services/sliceService';
import StorageService from '../../services/storageService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();
const storageService = new StorageService(localStorage);

const initialState = {
    error: null,
    account: null,
    message: null,
    loading: false,
    settings: null,
};

export const actionToSettings = createAsyncThunk(
    'settings/actionToSettings',
    async (data, {rejectWithValue}) => {
        const {type} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getSettingsLink()[type], null, type).get();

        return sliceService.switchingByData(opts, response); 
    }
);

export const actionToChangeEmail = createAsyncThunk(
    'settings/actionToChangeEmail',
    async (data, {rejectWithValue}) => {
        const {type, email} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getSettingsLink()[type], {email}, type).put();

        return sliceService.switchingByData(opts, response); 
    }
);

export const actionToChangePassword = createAsyncThunk(
    'settings/actionToChangePassword',
    async (data, {rejectWithValue}) => {
        const {type, password, newPassword, confirmPassword} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getSettingsLink()[type], {password, newPassword, confirmPassword}, type).put();

        return sliceService.switchingByData(opts, response); 
    }
);

export const actionToDeleteAccount = createAsyncThunk(
    'settings/actionToDeleteAccount',
    async (data, {rejectWithValue}) => {
        const {type, password} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getSettingsLink()[type], {password}, type).delete();

        return sliceService.switchingByData(opts, response); 
    }
);

export const settingsResetStateHandler = createAction('settings/settingsResetStateHandler');

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToSettings.pending, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(actionToChangeEmail.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToChangePassword.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToDeleteAccount.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToSettings.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.settings = action.payload;
            })
            .addCase(actionToChangeEmail.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(actionToChangePassword.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(actionToDeleteAccount.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(settingsResetStateHandler, (state) => {
                Object.assign(state, initialState);
            })
            .addCase(actionToSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                storageService.removeItem('authToken');
            })
            .addCase(actionToChangeEmail.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(actionToChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(actionToDeleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
    }
});

export default settingsSlice.reducer;