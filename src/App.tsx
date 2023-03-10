import React, {useEffect} from 'react';
import Layout from "./components/Layout";
import CardsTable from "./components/CardsTable";
import CardComponent from "./components/Card";

import FightArena from "./components/FightArena/FightArena";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {
    addEnemyCard,
    addPlayerCard,
    setEnemyCardHealth, setEnemyTargetCard, setPlayerCardHealth, setPlayerTargetCard,
    setSelectedEnemyCard,
    setSelectedPlayerCard, setUsedEnemyCards, setUsedPlayerCards
} from "./redux/slices/cardsSlice";

import dog from './svgs/Dog.svg';
import turtle from './svgs/Turtle.svg';
import {
    decrementEnemyMoves,
    decrementPlayerMoves,
    GameStateEnum,
    setCurrentState, setEnemyCash,
    setEnemyMoves, setMaxEnemyMoves,
    setMaxPlayerMoves, setPlayerCash,
    setPlayerMoves,
    setPlayerTurn
} from "./redux/slices/gameSlice";
import HeroCard from "./components/HeroCard";

function App() {
    const playerDeckCards = useAppSelector(state => state.cards.playerDeckCards);
    const enemyDeckCards = useAppSelector(state => state.cards.enemyDeckCards);
    const playerArenaCards = useAppSelector(state => state.cards.playerArenaCards);
    const enemyArenaCards = useAppSelector(state => state.cards.enemyArenaCards);
    const playerMoves = useAppSelector(state => state.game.playerMoves);
    const enemyMoves = useAppSelector(state => state.game.enemyMoves);
    const selectedPlayerCard = useAppSelector(state => state.cards.playerSelectedCard);
    const selectedEnemyCard = useAppSelector(state => state.cards.enemySelectedCard);
    const playerTargetCard = useAppSelector(state => state.cards.playerTargetCard);
    const enemyTargetCard = useAppSelector(state => state.cards.enemyTargetCard);
    const usedPlayerCards = useAppSelector(state => state.cards.usedPlayerCards);
    const usedEnemyCards = useAppSelector(state => state.cards.usedEnemyCards);
    const playerCash = useAppSelector(state => state.game.playerCash);
    const enemyCash = useAppSelector(state => state.game.enemyCash);

    const currentState = useAppSelector(state => state.game.currentState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(addPlayerCard({animal: dog, description: 'dog', attackPoints: 1, healthPoints: 1, cost: 1, id: 0}))
        dispatch(addPlayerCard({animal: dog, description: 'dog', attackPoints: 3, healthPoints: 2, cost: 5, id: 1}))
        dispatch(addEnemyCard({
            animal: turtle,
            description: 'turtle',
            attackPoints: 1,
            healthPoints: 1,
            cost: 1,
            id: 2,
            flipped: true
        }))
    }, [])

    const calculatePlayerMoves = () => {
        const moves = playerArenaCards.length + 1;
        dispatch(setPlayerMoves(moves))
        dispatch(setMaxPlayerMoves(moves))
    }

    const calculateEnemyMoves = () => {
        const moves = enemyArenaCards.length + 1;
        dispatch(setEnemyMoves(moves))
        dispatch(setMaxEnemyMoves(moves))
    }

    const endPlayerTurn = () => {
        dispatch(setPlayerTurn(false))
        dispatch(setCurrentState(GameStateEnum.ENEMY_TURN))
        calculateEnemyMoves()
        dispatch(setUsedPlayerCards([]))
        dispatch(setSelectedPlayerCard(null))
        dispatch(setPlayerTargetCard(null))
        dispatch(setPlayerCash(playerCash + 1))
    }

    const endEnemyTurn = () => {
        calculatePlayerMoves()
        dispatch(setCurrentState(GameStateEnum.PLAYER_TURN))
        dispatch(setPlayerTurn(true))
        dispatch(setUsedEnemyCards([]))
        dispatch(setSelectedEnemyCard(null))
        dispatch(setEnemyTargetCard(null))
        dispatch(setEnemyCash(enemyCash + 1))
    }

    const startGame = () => {
        dispatch(setCurrentState(GameStateEnum.PLAYER_TURN))
        dispatch(setPlayerTurn(true))
        calculatePlayerMoves()
    }

    const playerAttack = () => {
        if (playerMoves <= 0 || !playerTargetCard) return
        dispatch(decrementPlayerMoves())
        const enemyHealthPoints = playerTargetCard?.healthPoints! - selectedPlayerCard?.attackPoints!;
        const enemyCard = {...playerTargetCard!, healthPoints: enemyHealthPoints}
        dispatch(setEnemyCardHealth(enemyCard))
        if (enemyHealthPoints > 0) {
            const playerHealthPoints = selectedPlayerCard?.healthPoints! - playerTargetCard?.attackPoints!;
            const playerCard = {...selectedPlayerCard!, healthPoints: playerHealthPoints}
            dispatch(setPlayerCardHealth(playerCard))
        }
        dispatch(setSelectedPlayerCard(null))
        dispatch(setPlayerTargetCard(null))
        if (selectedPlayerCard?.healthPoints! > 0) dispatch(setUsedPlayerCards([...usedPlayerCards, selectedPlayerCard!]))
    }

    const enemyAttack = () => {
        if (enemyMoves <= 0 || !enemyTargetCard) return
        dispatch(decrementEnemyMoves())
        const playerHealthPoints = enemyTargetCard.healthPoints! - selectedEnemyCard?.attackPoints!;
        const playerCard = {...enemyTargetCard, healthPoints: playerHealthPoints}
        dispatch(setPlayerCardHealth(playerCard))
        if (playerHealthPoints > 0) {
            const enemyHealthPoints = selectedEnemyCard?.healthPoints! - enemyTargetCard?.attackPoints!;
            const enemyCard = {...selectedEnemyCard!, healthPoints: enemyHealthPoints}
            dispatch(setEnemyCardHealth(enemyCard))
        }
        dispatch(setSelectedEnemyCard(null))
        dispatch(setEnemyTargetCard(null))
        if (selectedEnemyCard?.healthPoints! > 0) dispatch(setUsedEnemyCards([...usedEnemyCards, selectedEnemyCard!]))
    }

    return (
        <Layout className="flex-col">
            <div className="absolute right-1/2 font-bold flex flex-col z-20">
                <p>Current state: {currentState}</p>
                <p>Player moves: {playerMoves}, Enemy moves: {enemyMoves}</p>
            </div>
            {currentState === GameStateEnum.START && <button
                className="bg-green-500 rounded absolute top-1/2 left-1/2 hover:scale-105 z-20 transform -translate-x-1/2 -translate-y-1/2 p-2 m-2 shadow-2xl hover:bg-green-600"
                onClick={startGame}>START
                THE GAME
            </button>}

            <CardsTable>
                <HeroCard isPlayer={false} />
                <span className="min-w-[2px] h-full bg-gray-500 shadow" />
                {enemyDeckCards.map((card, index) => <CardComponent key={`enemyDeckCard-${index}`} {...card}
                                                                    isPlayer={false}/>)}
            </CardsTable>
            <FightArena/>
            <CardsTable>
                <HeroCard isPlayer />
                <span className="min-w-[2px] h-full bg-gray-500 shadow" />
                {playerDeckCards.map((card, index) => <CardComponent key={`playerDeckCard-${index}`} {...card}
                                                                     isPlayer/>)}
            </CardsTable>
            {(currentState === GameStateEnum.PLAYER_TURN) &&
                <div className="flex flex-col absolute top-1/2 right-0 m-2 gap-1">
                    {playerTargetCard && <button className="bg-red-500 rounded p-2 shadow-2xl hover:bg-red-600"
                                                 onClick={playerAttack}>Attack</button>}
                    <button className="bg-red-500 rounded p-2 shadow-2xl hover:bg-red-600"
                            onClick={endPlayerTurn}>End turn</button>
                </div>}
            {(currentState === GameStateEnum.ENEMY_TURN) &&
                <div className="flex flex-col absolute top-1/2 right-0 m-2 gap-1">
                    {enemyTargetCard && <button className="bg-red-500 rounded p-2 shadow-2xl hover:bg-red-600"
                                                 onClick={enemyAttack}>Attack</button>}
                    <button className="bg-red-500 rounded p-2 shadow-2xl hover:bg-red-600"
                            onClick={endEnemyTurn}>End turn</button>
                </div>}
        </Layout>
    )
}

export default App;
