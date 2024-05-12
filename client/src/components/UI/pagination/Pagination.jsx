import React, { useState } from "react";
import "./Pagination.css";
import FirstPageIcon from "../icons/FirstPageIcon";
import LastPageIcon from "../icons/LastPageIcon";

/* const HoverButton = ({ children, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = (event) => {
        const elem = event.target.closest('.page-container__button');

        if (elem) {
            const cursorRadius = 30;
            const rect = elem.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const xMin = rect.left - cursorRadius;
            const xMax = rect.right + cursorRadius;
            const yMin = rect.top - cursorRadius;
            const yMax = rect.bottom + cursorRadius;

            if (mouseX >= xMin && mouseX <= xMax && mouseY >= yMin && mouseY <= yMax) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        }

        return (
            <div className="glow-container" onMouseOver={handleMouseOver}>
                <button {...props} className={`page-container__button ${isHovered ? 'hover' : ''}`}>
                    {children}
                </button>
            </div>
        );
    }
} */

const Pagination = ({ pageIndex, pageOptions, gotoPage, canPreviousPage, pageCount, canNextPage }) => {
    return (
        <div className="page-container">
            {/* <span>
                Страница{' '}
                <strong>
                    {pageIndex + 1} из {pageOptions.length}
                </strong>{' '}
            </span> */}
            <div className="page-container__pagination">
                <button className="page-container__button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <FirstPageIcon />
                </button>
                {/* <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button> */}
                <span>
                    {Array.from(
                        { length: Math.min(pageCount, 5) },
                        (_, index) => {
                            let page = 0;
                            if (pageCount > 5) {
                                if (pageIndex >= 2 && pageIndex <= pageCount - 3) {
                                    page = pageIndex - 2 + index;
                                } else if (pageIndex >= pageCount - 3) {
                                    page = pageCount - 5 + index;
                                } else {
                                    page = index;
                                }
                            } else {
                                page = index;
                            }
                            return (
                                page >= 0 && page < pageCount && (
                                    <button className="page-container__button" key={index} onClick={() => gotoPage(page)} disabled={page === pageIndex}>
                                        {page + 1}
                                    </button>
                                )
                            );
                        }
                    )}
                </span>
                {/* <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button> */}
                <button className="page-container__button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <LastPageIcon />
                </button>
            </div>
        </div>
    )
};

export default Pagination;
