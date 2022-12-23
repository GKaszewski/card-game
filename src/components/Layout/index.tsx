import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Layout: React.FC<Props> = ({children, className}) => {
    return (
        <div className={`${className} bg-gray-600 flex min-h-screen w-full`}>
            {children}
        </div>
    );
};

export default Layout;
