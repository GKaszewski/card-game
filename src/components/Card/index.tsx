import React, {useRef, useState} from "react";
import './style.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    Animal: any;
    description?: string;
    attackPoints?: number;
    healthPoints?: number;
    cost?: number;
    flipped?: boolean;
}

const Card: React.FC<Props> = ({Animal, description, attackPoints, healthPoints, cost, flipped}) => {
    const [shouldFlip, setShouldFlip] = useState(flipped);
    const cardRef = useRef<HTMLDivElement>(null)

    const handleOnClick = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;

    }

    return <div
        className={`${shouldFlip ? 'flip-card' : ''} select-none card min-w-[8rem] w-32 h-48 bg-gray-300 flex flex-col items-center shadow-lg rounded transform transition ease-in-out md:hover:scale-105`}
        onClick={handleOnClick}
        ref={cardRef}>
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
                    <Animal/>
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

export default Card;
