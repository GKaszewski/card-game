import React from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
}

const CardsTable: React.FC<Props> = (props) => {
    return <div className="flex gap-2 w-full bg-gray-400 border border-amber-200 h-52 items-center overflow-x-auto overflow-y-hidden">

    </div>
}

export default CardsTable;
