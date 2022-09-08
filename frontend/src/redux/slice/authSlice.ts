import StorageService from '../../services/storageService';
import {AnyAction, createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

const storageService = new StorageService(localStorage);

type authState = {
    loading: boolean,
    error: null | string,
    token: null | string,
    register: null | string,
};

const initialState: authState = {
    error: null,
    loading: false,
    register: null,
    token: storageService.getItem('authToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //   .addCase(fetchLogin.pending, (state) => {
        //     state.error = null;
        //     state.loading = true;
        //   })
        //   .addCase(fetchLogin.fulfilled, (state, action) => {
        //     state.loading = false;
        //     localStorage.setItem('access', action.payload);
        //   })
          .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
          });
      }
});

export default authSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
};