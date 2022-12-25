import React, {useEffect, useState} from "react";
import './style.css';
import {Card} from "../../utils/types/Card";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    addEnemyCardToArena,
    addPlayerCardToArena,
    checkIfCardIsInArena,
    removeEnemyCardFromArena,
    removePlayerCardFromArena, setEnemyTargetCard, setPlayerTargetCard, setSelectedPlayerCard
} from "../../redux/slices/cardsSlice";
import {
    decrementEnemyMoves,
    decrementPlayerMoves,
    GameStateEnum,
    incrementEnemyMoves,
    incrementPlayerMoves
} from "../../redux/slices/gameSlice";

interface Props extends Card {
    isPlayer?: boolean;
}

const CardComponent: React.FC<Props> = ({
                                            animal,
                                            description,
                                            attackPoints,
                                            healthPoints,
                                            cost,
                                            flipped,
                                            id,
                                            isPlayer
                                        }) => {
    const dispatch = useAppDispatch()
    const [shouldFlip, setShouldFlip] = useState(flipped);

    const playerArenaCards = useAppSelector(state => state.cards.playerArenaCards);
    const enemyArenaCards = useAppSelector(state => state.cards.enemyArenaCards);
    const playerMoves = useAppSelector(state => state.game.playerMoves);
    const enemyMoves = useAppSelector(state => state.game.enemyMoves);
    const selectedPlayerCard = useAppSelector(state => state.cards.playerSelectedCard);
    const selectedEnemyCard = useAppSelector(state => state.cards.enemySelectedCard);
    const playerTargetCard = useAppSelector(state => state.cards.playerTargetCard);
    const enemyTargetCard = useAppSelector(state => state.cards.enemyTargetCard);

    const currentState = useAppSelector(state => state.game.currentState);

    useEffect(() => {
        setShouldFlip(flipped);
    }, [flipped])

    const handlePlayerClick = () => {
        if (currentState === GameStateEnum.ENEMY_TURN && enemyMoves > 0) {
            dispatch(setEnemyTargetCard({animal, description, attackPoints, healthPoints, cost, id}))
        }
        if (currentState !== GameStateEnum.PLAYER_TURN) return;
        if (playerMoves > 0) {
            if (!playerArenaCards.some(card => card.id === id)) {
                dispatch(addPlayerCardToArena({animal, description, attackPoints, healthPoints, cost, id}))
                dispatch(decrementPlayerMoves())
            } else {
                dispatch(setSelectedPlayerCard({animal, description, attackPoints, healthPoints, cost, id}))
            }
        }
    }

    const handleEnemyClick = () => {
        if (currentState === GameStateEnum.PLAYER_TURN && playerMoves > 0) {
            dispatch(setPlayerTargetCard({animal, description, attackPoints, healthPoints, cost, id}))
        }
        if (currentState !== GameStateEnum.ENEMY_TURN) return;
        if (enemyMoves > 0) {
            if (!enemyArenaCards.some(card => card.id === id)) {
                dispatch(addEnemyCardToArena({animal, description, attackPoints, healthPoints, cost, id}))
                dispatch(decrementEnemyMoves())
            }
        }
    }

    const hidePlayerCard = () => {
        if (currentState !== GameStateEnum.PLAYER_TURN) return;
        dispatch(removePlayerCardFromArena({animal, description, attackPoints, healthPoints, cost, id}))
        dispatch(incrementPlayerMoves())
    }

    const hideEnemyCard = () => {
        if (currentState !== GameStateEnum.ENEMY_TURN) return;
        dispatch(removeEnemyCardFromArena({animal, description, attackPoints, healthPoints, cost, id}))
        dispatch(incrementEnemyMoves())
    }

    if (isPlayer) {
        return <div
            className={`${shouldFlip ? 'flip-card' : ''} ${selectedPlayerCard?.id === id ? 'border-4 border-red-500' : ''} ${enemyTargetCard?.id === id ? 'border-4 border-yellow-500 border-dotted' : ''} select-none card min-w-[8rem] w-32 h-48 bg-gray-300 flex flex-col items-center shadow-lg rounded transform transition ease-in-out md:hover:scale-105`}
            onClick={handlePlayerClick}>
            <div className="card-inner">
                <div className='card-front flex flex-col'>
                    {(currentState === GameStateEnum.PLAYER_TURN && checkIfCardIsInArena(playerArenaCards, {
                        id,
                        animal,
                        description,
                        flipped,
                        cost,
                        healthPoints,
                        attackPoints
                    })) && <button
                        className="font-bold absolute bottom-0 text-gray-200 text-4xl shadow hover:text-gray-500"
                        onClick={hidePlayerCard}>-</button>}
                    <div
                        className="w-8 h-8 bg-sky-300 rounded-full flex items-center justify-center p-1 shadow-lg absolute inset-0 -top-1 -left-1">
                        <p>{attackPoints || 0}</p>
                    </div>
                    <div
                        className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center p-1 shadow-lg absolute -top-1 -right-1">
                        <p>{healthPoints || 0}</p>
                    </div>
                    <div
                        className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center p-1 shadow-lg absolute bottom-0 left-1/2 right-1/2 transform -translate-x-1/2">
                        <p>{cost || 0}</p>
                    </div>
                    <div className="w-full h-1/2 p-2 mt-4">
                        <img src={animal}/>
                    </div>
                    <div
                        className="w-full min-h-[5rem] bg-gray-600/10 shadow rounded p-1 flex flex-wrap text-ellipsis text-sm overflow-hidden justify-center">
                        <p>{description || 'Lorem ipsum dolor sit amet.'}</p>
                    </div>
                </div>
                <div className="card-back bg-red-300 p-2">
                    <p>This is back.</p>
                </div>
            </div>
        </div>
    } else {

    }

    return <div
        className={`${shouldFlip ? 'flip-card' : ''} ${selectedEnemyCard?.id === id ? 'border-4 border-red-500' : ''} ${playerTargetCard?.id === id ? 'border-4 border-yellow-500 border-dotted' : ''} select-none card min-w-[8rem] w-32 h-48 bg-gray-300 flex flex-col items-center shadow-lg rounded transform transition ease-in-out md:hover:scale-105`}
        onClick={handleEnemyClick}>
        <div className="card-inner">
            <div className='card-front flex flex-col'>
                {(checkIfCardIsInArena(enemyArenaCards, {
                    id,
                    animal,
                    description,
                    flipped,
                    cost,
                    healthPoints,
                    attackPoints
                }) && currentState === GameStateEnum.ENEMY_TURN) && <button
                    className="font-bold absolute bottom-0 text-gray-200 text-4xl shadow hover:text-gray-500"
                    onClick={hideEnemyCard}>-</button>}
                <div
                    className="w-8 h-8 bg-sky-300 rounded-full flex items-center justify-center p-1 shadow-lg absolute inset-0 -top-1 -left-1">
                    <p>{attackPoints || 0}</p>
                </div>
                <div
                    className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center p-1 shadow-lg absolute -top-1 -right-1">
                    <p>{healthPoints || 0}</p>
                </div>
                <div
                    className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center p-1 shadow-lg absolute bottom-0 left-1/2 right-1/2 transform -translate-x-1/2">
                    <p>{cost || 0}</p>
                </div>
                <div className="w-full h-1/2 p-2 mt-4">
                    <img src={animal}/>
                </div>
                <div
                    className="w-full min-h-[5rem] bg-gray-600/10 shadow rounded p-1 flex flex-wrap text-ellipsis text-sm overflow-hidden justify-center">
                    <p>{description || 'Lorem ipsum dolor sit amet.'}</p>
                </div>
            </div>
            <div className="card-back bg-red-300 p-2">
                <p>This is enemy card.</p>
            </div>
        </div>
    </div>
}

export default CardComponent;
