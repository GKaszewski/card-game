import React, {useState} from "react";
import './style.css';
import {Card} from "../../utils/types/Card";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    addEnemyCardToArena,
    addPlayerCardToArena,
    removeEnemyCard, removeEnemyCardFromArena,
    removePlayerCardFromArena
} from "../../redux/slices/cardsSlice";

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

    const handleOnClick = () => {
        if (isPlayer) {
            if (!playerArenaCards.some(card => card.id === id)) {
                dispatch(addPlayerCardToArena({animal, description, attackPoints, healthPoints, cost, id}))
            } else {
                dispatch(removePlayerCardFromArena({animal, description, attackPoints, healthPoints, cost, id}))
            }
        } else {
            if (!enemyArenaCards.some(card => card.id === id)) {
                dispatch(addEnemyCardToArena({animal, description, attackPoints, healthPoints, cost, id}))
            } else {
                dispatch(removeEnemyCardFromArena({animal, description, attackPoints, healthPoints, cost, id}))
            }
        }

    }

    return <div
        className={`${shouldFlip ? 'flip-card' : ''} select-none card min-w-[8rem] w-32 h-48 bg-gray-300 flex flex-col items-center shadow-lg rounded transform transition ease-in-out md:hover:scale-105`}
        onClick={handleOnClick}>
        <div className="card-inner">
            <div className='card-front flex flex-col'>
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
                    <p>{description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel luctus orci. Aenean molestie mauris turpis, vitae lacinia mi tristique cursus. Maecenas a semper dui, nec pulvinar sapien. Donec id maximus quam, ut convallis libero. Mauris semper, nulla ut mattis tristique, neque enim auctor dolor, ac ultrices felis odio placerat tortor. Mauris sed tempor purus, at tempus turpis. Curabitur accumsan commodo neque, hendrerit tincidunt arcu ullamcorper quis. Suspendisse rhoncus dignissim faucibus. Ut vel lectus in metus lacinia finibus. Cras sed ipsum sagittis velit finibus iaculis.'}</p>
                </div>
            </div>
            <div className="card-back bg-red-300 p-2">
                <p>This is back.</p>
            </div>
        </div>
    </div>
}

export default CardComponent;
