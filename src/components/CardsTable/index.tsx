import React, {PropsWithChildren} from "react"

const CardsTable: React.FC<PropsWithChildren> = ({children}) => {
    return <div
        className="flex gap-2 w-full bg-gray-400 border border-amber-200 h-52 items-center overflow-x-auto overflow-y-hidden">
        {children}
    </div>
}

export default CardsTable;
