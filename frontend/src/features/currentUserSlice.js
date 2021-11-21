import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import { setIsLoggedIn, setUser } from './appSlice'

const initialState = {
    error: null,
    loading: 'idle',
    currentRequestId: undefined,
}

export const setCurrentUser = createAsyncThunk(
    'currentUser/setCurrentUser',
    async (blank, { getState, requestId, dispatch }) => {
        const { currentRequestId, loading, } = getState().currentUser
        if (loading !== 'pending' || requestId !== currentRequestId) {
            return
        }
        const user = await authService.getCurrentUser()
        dispatch(setUser(user))
        dispatch(setIsLoggedIn(true))

    }
)

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers: {
        [setCurrentUser.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
            }
        },
        [setCurrentUser.fulfilled]: (state, action) => {
            const { requestId } = action.meta
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle'
                state.error = null
                state.currentRequestId = undefined
            }
        },
        [setCurrentUser.rejected]: (state, action) => {
            const { requestId } = action.meta
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle'
                state.error = action.error
                state.currentRequestId = undefined
            }
        },
    },
});


export const selectCurrentUser = state => state.currentUser;

export default currentUserSlice.reducer;