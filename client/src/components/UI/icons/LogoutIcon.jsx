import React from "react";

function LogoutIcon({stroke="currentColor"}) {
    return (
        <svg
            dataslot="icon"
            height={24}
            width={24}
            fill="none"
            strokeWidth={1.5}
            stroke={stroke}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
    );
}

export default LogoutIcon;
