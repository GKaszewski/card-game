import React, {useRef} from "react";

const FightArena: any = (props: any, ref: any) => {
    const playerCardsArena = useRef<HTMLDivElement>(null);
    const enemyCardsArena = useRef<HTMLDivElement>(null);

    return <div ref={ref} className="relative flex flex-1 flex-col justify-center items-center m-2">
        <h1 className="absolute text-5xl md:text-9xl font-bold text-white/50 md:hover:text-red-600 select-none">FIGHT!</h1>
        <div id="enemyArena" ref={enemyCardsArena} className="w-full flex gap-2 justify-center">
        </div>
        <span className="flex-1" />
        <div id="playerArena" ref={playerCardsArena} className="w-full flex gap-2 justify-center">
        </div>
    </div>
}

export default React.forwardRef(FightArena)
