import SliceService from '../../services/sliceService/sliceService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();

const initialState = {
    error: null,
    message: null,
    contact: null,
    loading: false,
};

export const actionToContact = createAsyncThunk(
    'contact/actionToContact',
    async (data, {rejectWithValue}) => {
        const {type} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getContactLink()[type], null, type).get();

        return sliceService.switchingByData(opts, response); 
    }
);

export const actionToSendingMessage = createAsyncThunk(
    'contact/actionToSendingMessage',
    async (data, {rejectWithValue}) => {
        const {type, name, email, message} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getContactLink()[type], {name, email, message}, type).post();

        return sliceService.switchingByData(opts, response); 
    }
);

export const contactResetStateHandler = createAction('contact/contactResetStateHandler');

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToContact.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToSendingMessage.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToContact.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.contact = action.payload;
            })
            .addCase(actionToSendingMessage.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(contactResetStateHandler, (state) => {
                Object.assign(state, initialState);
            })
            .addCase(actionToContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(actionToSendingMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default contactSlice.reducer;