import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eventos: []
}

export const eventosSlice = createSlice({
    name: "eventos",
    initialState,
    reducers: {
        guardarEventos: (state, action) => {
            //immer
            state.eventos = action.payload;
        },
        eliminarEvento: (state, action) => {
            //immer
            state.eventos = state.eventos.filter(evento => evento.id !== action.payload);
        },
        guardarEvento: (state, action) => {
            state.eventos.push(action.payload);
        }
    }
})

export const { guardarEventos, guardarEvento,eliminarEvento } = eventosSlice.actions;
export default eventosSlice.reducer;