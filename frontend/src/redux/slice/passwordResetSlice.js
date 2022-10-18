import SliceService from '../../services/sliceService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();

const initialState = {
    error: null,
    loading: false,
    passwordReset: null,
};

export const actionToPasswordReset = createAsyncThunk(
    'passwordReset/actionToPasswordReset',
    async (data, {rejectWithValue}) => {
        let opts = {type, rejectWithValue};
        const {type, password, confirmPassword, resetToken} = data;
        let response = await sliceService.getApi(sliceService.getPasswordResetLink(resetToken)[type], {password, confirmPassword}, type).put();

        return sliceService.switchingByData(opts, response); 
    }
);

export const resetPasswordResetStateHandler = createAction('passwordReset/resetPasswordResetStateHandler');

const passwordResetSlice = createSlice({
    name: 'passwordReset',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToPasswordReset.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.passwordReset = null;
            })
            .addCase(actionToPasswordReset.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                passwordReset = action.payload;
            })
            .addCase(actionToPasswordReset.rejected, (state, action) => {
                state.loading = false;
                state.passwordReset = null;
                state.error = action.payload;
            })
            .addCase(resetPasswordResetStateHandler, (state) => {
                Object.assign(state, initialState);
            })
    }
});

export default passwordResetSlice.reducer;