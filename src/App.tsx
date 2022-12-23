import React from 'react';
import Layout from "./components/Layout";
import CardsTable from "./components/CardsTable";
import CardComponent from "./components/Card";

import FightArena from "./components/FightArena/FightArena";
import {useAppSelector} from "./redux/hooks";

function App() {
    const playerDeckCards = useAppSelector(state => state.cards.playerDeckCards);
    const enemyDeckCards = useAppSelector(state => state.cards.enemyDeckCards);
  return (
      <Layout className="flex-col">
          <CardsTable>
              {enemyDeckCards.map((card, index) => <CardComponent key={`enemyDeckCard-${index}`} {...card} isPlayer={false}/>)}
          </CardsTable>
          <FightArena />
         <CardsTable>
             {playerDeckCards.map((card, index) => <CardComponent key={`playerDeckCard-${index}`} {...card} isPlayer/>)}
         </CardsTable>
      </Layout>
  )
}

export default App;
