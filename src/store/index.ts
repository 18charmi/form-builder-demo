import { configureStore } from '@reduxjs/toolkit'
import formReducer from './Form.slice'

const store = configureStore({
    reducer: {
        form: formReducer
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;