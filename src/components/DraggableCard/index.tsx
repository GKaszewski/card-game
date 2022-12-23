import React from "react";
import Card from "../Card";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    Animal: any;
    description?: string;
    attackPoints?: number;
    healthPoints?: number;
    cost?: number;
    flipped?: boolean;
}

const DraggableCard: React.FC<Props> = (props) => {

    return <div>
        <span>
            <Card {...props} />
        </span>
    </div>
}

export default DraggableCard;
