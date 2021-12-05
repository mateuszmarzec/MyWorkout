import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service';

const initialState = {
    isLoggedIn: null,
    user: null,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            authService.logout()
            state.user = null
            state.isLoggedIn = false
        },

    }
});

export const { setIsLoggedIn, setUser, logout } = appSlice.actions

export const selectApp = state => state.app

export default appSlice.reducer