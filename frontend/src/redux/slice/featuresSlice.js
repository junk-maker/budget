import SliceService from '../../services/sliceService/sliceService';
import StorageService from '../../services/storageService/storageService';
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';

const sliceService = new SliceService();
const storageService = new StorageService(localStorage);

const initialState = {
    error: null,
    loading: false,
    features: null,
};

export const actionToFeatures = createAsyncThunk(
    'features/actionToFeatures',
    async (data, {rejectWithValue}) => {
        const {type} = data;
        let opts = {type, rejectWithValue};
        let response = await sliceService.getApi(sliceService.getFeaturesLink()[type], null, type).get();

        return sliceService.switchingByData(opts, response); 
    }
);

export const featuresResetStateHandler = createAction('features/featuresResetStateHandler');

const featuresSlice = createSlice({
    name: 'features',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(actionToFeatures.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(actionToFeatures.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.features = action.payload;
            })
            .addCase(featuresResetStateHandler, (state) => {
                Object.assign(state, initialState);
            })
            .addCase(actionToFeatures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                storageService.removeItem('authToken');
            })
    }
});

export default featuresSlice.reducer;