import React, {RefObject, useEffect, useRef} from 'react';
import Layout from "./components/Layout";
import CardsTable from "./components/CardsTable";
import Card from "./components/Card";
import DraggableCard from "./components/DraggableCard";

import {ReactComponent as Turtle} from './svgs/Turtle.svg';
import {ReactComponent as Parrot} from './svgs/Parrot.svg';
import {ReactComponent as Cat} from './svgs/Cat.svg';
import {ReactComponent as Dog} from './svgs/Dog.svg';
import FightArena from "./components/FightArena/FightArena";

function App() {
    const fightArenaRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
    }, [fightArenaRef]);

  return (
      <Layout className="flex-col">
          <CardsTable id="enemyCardsTable">
              <Card Animal={Dog} description="This is a dog." flipped/>
              <Card Animal={Dog} description="This is a dog." flipped/>
              <Card Animal={Parrot} flipped/>
              <Card Animal={Parrot} flipped/>
          </CardsTable>
          <FightArena ref={fightArenaRef} />
         <CardsTable id="playerCardsTable">
             <DraggableCard Animal={Turtle}/>
             <Card Animal={Dog}/>
             <Card Animal={Parrot}/>
         </CardsTable>
      </Layout>
  )
}

export default App;
