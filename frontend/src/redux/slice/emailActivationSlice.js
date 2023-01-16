import SliceService from '../../services/sliceService/sliceService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();

const initialState = {
    error: null,
    loading: false,
    activation: null,
};

export const actionToEmailActivation = createAsyncThunk(
    'emailActivation/actionToEmailActivation',
    async (data, {rejectWithValue}) => {
        const {type, token} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getEmailActivationLink(token)[type], null, type).get();
        
        return sliceService.switchingByData(opts, response); 
    }
);

export const activationResetStateHandler = createAction('emailActivation/activationResetStateHandler');

const emailActivationSlice = createSlice({
    name: 'emailActivation',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToEmailActivation.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.activation = null;
            })
            .addCase(actionToEmailActivation.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activation = action.payload;
            })
            .addCase(actionToEmailActivation.rejected, (state, action) => {
                state.loading = false;
                state.activation = null;
                state.error = action.payload;
            })
            .addCase(activationResetStateHandler, (state) => {
                Object.assign(state, initialState);
            })
    }
});

export default emailActivationSlice.reducer;