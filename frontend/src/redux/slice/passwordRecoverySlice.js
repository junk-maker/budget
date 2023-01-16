import SliceService from '../../services/sliceService/sliceService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();

const initialState = {
    error: null,
    email: null,
    loading: false,
};

export const actionToPasswordRecovery = createAsyncThunk(
    'passwordRecovery/actionToPasswordRecovery',
    async (data, {rejectWithValue}) => {
        const {type, email} = data;
        let opts = {type, rejectWithValue};
        let response =  await sliceService.getApi(sliceService.getPasswordRecoveryLink()[type], {email}, type).post();

        return sliceService.switchingByData(opts, response); 
    }
);

export const resetPasswordRecoveryStateHandler = createAction('passwordRecovery/resetPasswordRecoveryStateHandler');

const passwordRecoverySlice = createSlice({
    name: 'passwordRecovery',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToPasswordRecovery.pending, (state) => {
                state.error = null;
                state.email = null;
                state.loading = true;
            })
            .addCase(actionToPasswordRecovery.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                email = action.payload;
            })
            .addCase(actionToPasswordRecovery.rejected, (state, action) => {
                state.email = null;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetPasswordRecoveryStateHandler, (state) => {
                Object.assign(state, initialState);
            })
    }
});

export default passwordRecoverySlice.reducer;
