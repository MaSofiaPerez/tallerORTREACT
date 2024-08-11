import { configureStore } from "@reduxjs/toolkit";
import eventosReducer from "../features/eventosSlice"
import categoriasReducer from "../features/categoriasSlice"

export const store = configureStore({
    reducer: {
        eventos:eventosReducer,
        categorias:categoriasReducer
    }

})

