import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {GameStateEnum, setCurrentState, setEnemyHealth, setPlayerHealth} from "../../redux/slices/gameSlice";
import {
    setEnemyCardHealth,
    setEnemyTargetCard,
    setSelectedEnemyCard,
    setSelectedPlayerCard
} from "../../redux/slices/cardsSlice";

interface Props {
    avatar?: string;
    name?: string;
    isPlayer: boolean;
}

const HeroCard: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch()

    const playerHealth = useAppSelector(state => state.game.playerHealth);
    const enemyHealth = useAppSelector(state => state.game.enemyHealth);
    const playerCash = useAppSelector(state => state.game.playerCash);
    const enemyCash = useAppSelector(state => state.game.enemyCash);

    const playerArenaCards = useAppSelector(state => state.cards.playerArenaCards);
    const enemyArenaCards = useAppSelector(state => state.cards.enemyArenaCards);
    const selectedPlayerCard = useAppSelector(state => state.cards.playerSelectedCard);
    const selectedEnemyCard = useAppSelector(state => state.cards.enemySelectedCard);


    const handlePlayerClick = () => {
        if (enemyArenaCards.length !== 0) return
        const health = enemyHealth - selectedPlayerCard?.attackPoints!;
        dispatch(setEnemyHealth(health))
        if (health <= 0) {
            dispatch(setCurrentState(GameStateEnum.WON))
        }
        dispatch(setSelectedPlayerCard(null))
    }

    const handleEnemyClick = () => {
        if (playerArenaCards.length !== 0) return
        const health = playerHealth - selectedEnemyCard?.attackPoints!;
        dispatch(setPlayerHealth(health))
        if (health <= 0) {
            dispatch(setCurrentState(GameStateEnum.LOST))
        }
        dispatch(setSelectedEnemyCard(null))
    }

    return <div onClick={props.isPlayer ? handleEnemyClick : handlePlayerClick} className="select-none min-w-[8rem] w-32 h-48 shadow-lg rounded">
        <div className="w-full h-full rounded-md bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 p-1">
            <div className="relative w-full h-full bg-gray-300 flex flex-col items-center">
                <p>Hero</p>
                <div
                    className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center p-1 shadow-lg absolute bottom-0 left-1">
                    <p>{props.isPlayer ? playerHealth : enemyHealth || 0}</p>
                </div>
                <div
                    className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center p-1 shadow-lg absolute bottom-0 right-1">
                    <p>{props.isPlayer ? playerCash : enemyCash || 0}</p>
                </div>
            </div>
        </div>
    </div>
}

export default HeroCard