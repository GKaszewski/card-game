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
    playerHealth: number;
    enemyHealth: number;
    playerCash: number;
    enemyCash: number;
}

export const initialState: GameState = {
    playerTurn: true,
    currentState: GameStateEnum.START,
    playerMoves: 0,
    enemyMoves: 0,
    maxPlayerMoves: 0,
    maxEnemyMoves: 0,
    playerHealth: 1,
    enemyHealth: 1,
    playerCash: 1,
    enemyCash: 1,
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
        setPlayerHealth: (state, action: PayloadAction<number>) => {
            state.playerHealth = action.payload;
            return state;
        },
        setEnemyHealth: (state, action: PayloadAction<number>) => {
            state.enemyHealth = action.payload;
            return state;
        },
        setPlayerCash: (state, action: PayloadAction<number>) => {
            state.playerCash = action.payload;
            return state;
        },
        setEnemyCash: (state, action: PayloadAction<number>) => {
            state.enemyCash = action.payload;
            return state;
        }
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
    setPlayerHealth,
    setEnemyHealth,
    setPlayerCash,
    setEnemyCash
} = gameSlice.actions;

export default gameSlice.reducer;