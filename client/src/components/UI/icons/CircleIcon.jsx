import React from "react"

const CircleIcon = ({ fill = "black" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={10}
            height={10}
            viewBox="0 0 32 32"
            fill={fill}
        >
            <circle cx="16" cy="16" r="16"></circle>
        </svg>
    );
};

export default CircleIcon;
