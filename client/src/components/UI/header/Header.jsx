import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import SignInIcon from "../icons/ArrowRightIcon";

const Header = () => {
    return (
        <div className="header">
            <ul className="header__list">
                <li>
                    <Link to={"/companies"}><span>Акции</span></Link>
                </li>
                <li>
                    <Link to={"/bonds"}><span>Облигации</span></Link>
                </li>
                <li>
                    <Link to={"/etfs"}><span>ETF</span></Link>
                </li>
                <li>
                    <Link to={"/portfolio"}><span>Портфель</span></Link>
                </li>
            </ul>
            <div className="header__btns">
                <Button >Войти</Button>
                {/* <Button reg={true} ><span>Регистрация</span></Button> */}
            </div>
        </div>
    )
};

export default Header;
