import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum GameStateEnum {
    START = 'START',
    PLAYER_TURN = 'PLAYER_TURN',
    ENEMY_TURN = 'ENEMY_TURN',
    WON = 'WON',
    LOST = 'LOST',
}

interface GameState {
    playerTurn: boolean;
    currentState: GameStateEnum;
    playerMoves: number;
    enemyMoves: number;
    maxPlayerMoves: number;
    maxEnemyMoves: number;
}

export const initialState: GameState = {
    playerTurn: true,
    currentState: GameStateEnum.START,
    playerMoves: 0,
    enemyMoves: 0,
    maxPlayerMoves: 0,
    maxEnemyMoves: 0,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setPlayerTurn: (state, action: PayloadAction<boolean>) => {
            state.playerTurn = action.payload;
            return state;
        },
        setCurrentState: (state, action: PayloadAction<GameStateEnum>) => {
            state.currentState = action.payload;
            return state;
        },
        setPlayerMoves: (state, action: PayloadAction<number>) => {
            state.playerMoves = action.payload;
            return state;
        },
        setEnemyMoves: (state, action: PayloadAction<number>) => {
            state.enemyMoves = action.payload;
            return state;
        },
        incrementPlayerMoves: (state) => {
            state.playerMoves++;
            return state;
        },
        incrementEnemyMoves: (state) => {
            state.enemyMoves++;
            return state;
        },
        decrementPlayerMoves: (state) => {
            state.playerMoves--;
            return state;
        },
        decrementEnemyMoves: (state) => {
            state.enemyMoves--;
            return state;
        },
        setMaxPlayerMoves: (state, action: PayloadAction<number>) => {
            state.maxPlayerMoves = action.payload;
            return state;
        },
        setMaxEnemyMoves: (state, action: PayloadAction<number>) => {
            state.maxEnemyMoves = action.payload;
            return state;
        },
    },
})

export const {
    setPlayerTurn,
    setCurrentState,
    decrementEnemyMoves,
    decrementPlayerMoves,
    incrementEnemyMoves,
    incrementPlayerMoves,
    setPlayerMoves,
    setEnemyMoves,
    setMaxEnemyMoves,
    setMaxPlayerMoves,
} = gameSlice.actions;

export default gameSlice.reducer;