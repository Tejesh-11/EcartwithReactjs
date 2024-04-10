import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slices/userLoginSlice'

export const store=configureStore({
    reducer:{
        login:loginReducer
    }
})