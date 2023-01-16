import SliceService from '../../services/sliceService/sliceService';
import StorageService from '../../services/storageService/storageService';
import {createSlice, createAction, createAsyncThunk, AnyAction, PayloadAction} from '@reduxjs/toolkit';
import {ErrorPayload, ResponsePayload} from '../../interface/frontend.interface';

const sliceService = new SliceService();
const storageService = new StorageService();

const URL = sliceService.getAuthLink();
type ObjectKey = keyof typeof URL;

interface MyKnownError {
    error: string;
    success: boolean;
}

type AuthPayload = {
    token: string;
    error: string;
    register: string;
    success: boolean;
};

interface DataProps {
    type: string;
    name?: string;
    email: string;
    password: string;
    navigate: Function;
};

type AuthState = {
    loading: boolean;
    token: string | null;
    error: null | string;
    register: string | null;
};

const initialState: AuthState = {
    error: null,
    loading: false,
    register: null,
    token: storageService.getItem('authToken'),
};

export const actionToSignIn = createAsyncThunk<AuthPayload, DataProps, {rejectValue: ErrorPayload}>(
    'auth/actionToSignIn',
    async (data: DataProps, {rejectWithValue}) => {
        const {type, email, password, navigate} = data;
        let url = type as ObjectKey;
        let opts = {navigate, rejectWithValue};
        let response = await sliceService.getApi(URL[url], {email, password}, type).post();
        console.log(response, 'response')

        return sliceService.authStatementLogic(type, opts, response);
    }
);

export const actionToSignUp = createAsyncThunk<AuthPayload, DataProps, {rejectValue: string}>(
    'auth/actionToSignUp',
    async (data: DataProps, {rejectWithValue}) => {
        const {type, name, email, password, navigate} = data;
        let url = type as ObjectKey;
        let opts = {navigate, rejectWithValue};
        let response = await sliceService.getApi(URL[url], {name, email, password}, type).post();
        console.log(response)
        return sliceService.authStatementLogic(type, opts, response);
    }
);

export const authResetStateHandler = createAction('auth/authResetStateHandler');

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
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
            .addCase(actionToSignIn.fulfilled, (state, action: PayloadAction<AuthPayload>) => {
                console.log(action.payload, 'payload')
                state.error = null;
                state.loading = false;
                storageService.setItem('authToken', action.payload.token);
            })
            .addCase(actionToSignUp.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                // state.register = action.payload;
            })
            .addCase(authResetStateHandler, (state) => {
                Object.assign(state, initialState);
            })
            .addCase(actionToSignIn.rejected, (state, action) => {
                console.log(action.payload)
                state.loading = false;
                // state.error = action.error;
            })
            .addCase(actionToSignUp.rejected, (state, action: AnyAction) => {
                console.log(action)
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default authSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
  }