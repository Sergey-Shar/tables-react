import { configureStore } from "@reduxjs/toolkit";
import { api } from "app/services/api";
import tableReduser from 'features/table'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
         table: tableReduser, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch