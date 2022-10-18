import SliceService from '../../services/sliceService';
import StorageService from '../../services/storageService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();
const storageService = new StorageService(localStorage);

const initialState = {
    token: storageService.getItem('authToken'),
};

export const actionToLogout = createAction('logout/actionToLogout');

const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToLogout, (state) => {
                Object.assign(state, initialState);
                storageService.removeItem('authToken');
            })
    }
});

export default logoutSlice.reducer;