import React from "react";
import {useAppSelector} from "../../redux/hooks";
import CardComponent from "../Card";
import {GameStateEnum} from "../../redux/slices/gameSlice";

const FightArena: React.FC = () => {
    const playerArenaCards = useAppSelector(state => state.cards.playerArenaCards);
    const enemyArenaCards = useAppSelector(state => state.cards.enemyArenaCards);

    const currentState = useAppSelector(state => state.game.currentState);

    return <div className="relative flex flex-1 flex-col justify-center items-center m-2">
        {currentState !== GameStateEnum.START && <h1 className="absolute text-5xl md:text-9xl font-bold text-white/50 md:hover:text-red-600 select-none">FIGHT!</h1>}
        <div className="w-full flex gap-2 justify-center">
            {enemyArenaCards.map((card, index) => <CardComponent key={`enemyArenaCard-${index}`} {...card} isPlayer={false}/>)}
        </div>
        <span className="flex-1" />
        <div className="w-full flex gap-2 justify-center">
            {playerArenaCards.map((card, index) => <CardComponent key={`playerArenaCard-${index}`} {...card} isPlayer/>)}
        </div>
    </div>
}

export default FightArena;
