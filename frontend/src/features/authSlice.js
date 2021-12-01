import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { setIsLoggedIn, setUser } from './appSlice'
import Router from 'next/router';

const initialState = {
    error: null,
    loading: 'idle',
    currentRequestId: undefined
}

export const login = createAsyncThunk(
    'auth/login',
    async ({data, loginFunction}, { getState, requestId, dispatch }) => {
        const { currentRequestId, loading } = getState().auth
        if (loading !== 'pending' || requestId !== currentRequestId) {
            return
        }
        const user = await loginFunction(data)
        dispatch(setUser(user.user))
        dispatch(setIsLoggedIn(true))
        Router.push('/')
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
            }
        },
        [login.fulfilled]: (state, action) => {
            const { requestId } = action.meta
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle'
                state.error = null
                state.currentRequestId = undefined
            }
          },
        [login.rejected]: (state, action) => {
            const { requestId } = action.meta
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle'
                state.error = action.error.message
                state.currentRequestId = undefined
            }
        }
    }
});

export const selectAuth = state => state.auth

export default authSlice.reducer