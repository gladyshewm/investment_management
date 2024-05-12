import React from "react";

const PlusIcon = ({ stroke }) => {
    return (
        <svg
            dataslot="icon"
            fill="none"
            width={20}
            height={20}
            strokeWidth={1.5}
            stroke={stroke}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
};

export default PlusIcon;
