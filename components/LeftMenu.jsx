"use client";
import { cn } from '@/lib/utils';
import React from 'react';

const LeftMenu = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
            <div
                className={cn(
                    `${isOpen ? 'max-w-[400px]' : 'max-w-0'} bg-red-700 overflow-hidden overflow-y-auto transition-all duration-300 ease-in-out h-full`
                )}
            >
                oi
            </div>
        </>
    );
};

export default LeftMenu;
