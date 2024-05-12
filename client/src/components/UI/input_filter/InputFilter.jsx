import React from "react";
import "./InputFilter.css";
import SearchIcon from "../icons/SearchIcon";

const InputFilter = ({ filter, setFilter, placeholder }) => {
    return (
        <div className="col">
            <SearchIcon />
            <input
                className="input-filter"
                placeholder={placeholder}
                value={filter || ''}
                onChange={e => setFilter(e.target.value)}
            />
            {/* <span className="focus-border"></span> */}
        </div>
    )
};

export default InputFilter;
