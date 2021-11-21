import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../features/appSlice'
import authReducer from '../features/authSlice'
import currentUserReducer from '../features/currentUserSlice'

export default configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    currentUser: currentUserReducer,
  },
});