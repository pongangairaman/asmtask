import { configureStore } from '@reduxjs/toolkit'
import studentDetailReducer from '../slice/studentDetail'

export const store = configureStore({
    reducer: {
        studentDetail: studentDetailReducer
    },
})