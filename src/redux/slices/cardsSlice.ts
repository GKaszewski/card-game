import {Card} from "../../utils/types/Card";
import Turtle from '../../svgs/Turtle.svg';
import Cat from '../../svgs/Cat.svg';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface CardsState {
    playerDeckCards: Card[];
    enemyDeckCards: Card[];
    playerArenaCards: Card[];
    enemyArenaCards: Card[];
}

const initialState: CardsState = {
    playerDeckCards: [{
        animal: Turtle,
        description: 'Turtle',
        attackPoints: 1,
        healthPoints: 1,
        cost: 1,
        flipped: false,
        id: 4
    }],
    playerArenaCards: [],
    enemyDeckCards: [{
        animal: Cat,
        description: 'Turtle',
        attackPoints: 1,
        healthPoints: 1,
        cost: 1,
        flipped: true,
        id: 5
    }],
    enemyArenaCards: []
}

const addCard = (cards: Card[], card: Card) => {
    cards.push(card);
    return cards;
}

const removeCard = (cards: Card[], card: Card) => {
    cards = cards.filter((c) => c.id !== card.id);
    return cards;
}

const addCardToArena = (deckCards: Card[], arenaCards: Card[], card: Card) => {
    deckCards = removeCard(deckCards, card);
    arenaCards = addCard(arenaCards, card);
    return {deckCards, arenaCards};
}

const removeCardFromArena = (deckCards: Card[], arenaCards: Card[], card: Card) => {
    arenaCards = removeCard(arenaCards, card);
    deckCards = addCard(deckCards, card);
    return {deckCards, arenaCards};
}

const flipCard = (cards: Card[], card: Card) => {
    cards.map((c) => {
        if (c.id === card.id) {
            c.flipped = !c.flipped;
        }
        return c;
    })
    return cards;
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addPlayerCard: (state, action: PayloadAction<Card>) => {
            state.playerDeckCards = addCard(state.playerDeckCards, action.payload);
            return state
        },
        removePlayerCard: (state, action: PayloadAction<Card>) => {
            state.playerDeckCards = removeCard(state.playerDeckCards, action.payload);
            return state
        },
        flipPlayerDeckCard: (state, action: PayloadAction<Card>) => {
            state.playerDeckCards = flipCard(state.playerDeckCards, action.payload);
            return state
        },
        flipPlayerArenaCard: (state, action: PayloadAction<Card>) => {
            state.playerArenaCards = flipCard(state.playerArenaCards, action.payload);
            return state
        },
        addPlayerCardToArena: (state, action: PayloadAction<Card>) => {
            const {
                deckCards,
                arenaCards
            } = addCardToArena(state.playerDeckCards, state.playerArenaCards, action.payload);
            state.playerArenaCards = arenaCards;
            state.playerDeckCards = deckCards;
            return state
        },
        removePlayerCardFromArena: (state, action: PayloadAction<Card>) => {
            const {
                deckCards,
                arenaCards
            } = removeCardFromArena(state.playerDeckCards, state.playerArenaCards, action.payload);
            state.playerArenaCards = arenaCards;
            state.playerDeckCards = deckCards;
            return state
        },
        addEnemyCard: (state, action: PayloadAction<Card>) => {
            state.enemyDeckCards = addCard(state.enemyDeckCards, action.payload);
            return state
        },
        removeEnemyCard: (state, action: PayloadAction<Card>) => {
            state.enemyDeckCards = removeCard(state.enemyDeckCards, action.payload);
            return state
        },
        flipEnemyDeckCard: (state, action: PayloadAction<Card>) => {
            state.enemyDeckCards = flipCard(state.enemyDeckCards, action.payload);
            return state
        },
        flipEnemyArenaCard: (state, action: PayloadAction<Card>) => {
            state.enemyArenaCards = flipCard(state.enemyArenaCards, action.payload);
            return state
        },
        addEnemyCardToArena: (state, action: PayloadAction<Card>) => {
            const {deckCards, arenaCards} = addCardToArena(state.enemyDeckCards, state.enemyArenaCards, action.payload);
            state.enemyArenaCards = arenaCards;
            state.enemyDeckCards = deckCards;
            return state
        },
        removeEnemyCardFromArena: (state, action: PayloadAction<Card>) => {
            const {
                deckCards,
                arenaCards
            } = removeCardFromArena(state.enemyDeckCards, state.enemyArenaCards, action.payload);
            state.enemyArenaCards = arenaCards;
            state.enemyDeckCards = deckCards;
            return state
        }
    }
})

export const {
    addPlayerCard,
    removePlayerCard,
    flipPlayerDeckCard,
    flipPlayerArenaCard,
    addPlayerCardToArena,
    removePlayerCardFromArena,
    addEnemyCard,
    removeEnemyCard,
    flipEnemyDeckCard,
    flipEnemyArenaCard,
    addEnemyCardToArena,
    removeEnemyCardFromArena
} = cardsSlice.actions

export const selectDeckCards = (state: RootState) => state.cards.playerDeckCards
export const selectArenaCards = (state: RootState) => state.cards.playerArenaCards
export const selectEnemyDeckCards = (state: RootState) => state.cards.enemyDeckCards
export const selectEnemyArenaCards = (state: RootState) => state.cards.enemyArenaCards

export default cardsSlice.reducer