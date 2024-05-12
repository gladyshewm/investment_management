import React from "react"

const AssetIcon = ({ fill }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className="si-glyph si-glyph-column-wave"
            viewBox="0 -0.5 17 17"
        >
            <g fill={fill} fillRule="evenodd">
                <path
                    d="M12 1.057C12 .473 12.447 0 12.999 0S14 .473 14 1.057v12.719c0 .584-.449 1.057-1.001 1.057-.552 0-.999-.473-.999-1.057V1.057zM8 4.057C8 3.473 8.449 3 8.999 3 9.552 3 10 3.473 10 4.057v9.719c0 .584-.448 1.057-1.001 1.057-.55 0-.999-.473-.999-1.057V4.057zM4.002 7.057C4.002 6.473 4.449 6 5 6c.552 0 1 .473 1 1.057v6.719c0 .584-.448 1.057-1 1.057-.551 0-.998-.473-.998-1.057V7.057zM.043 10.057C.043 9.473.481 9 1.021 9S2 9.473 2 10.057v3.719c0 .584-.439 1.057-.979 1.057s-.978-.473-.978-1.057v-3.719z"
                    className="si-glyph-fill"
                    transform="translate(2 1)"
                ></path>
            </g>
        </svg>
    );
};

export default AssetIcon;
