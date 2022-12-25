import {configureStore} from "@reduxjs/toolkit";
import {cardsSlice} from "./slices/cardsSlice";
import {gameSlice} from "./slices/gameSlice";

const store = configureStore({
    reducer: {
        cards: cardsSlice.reducer,
        game: gameSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store