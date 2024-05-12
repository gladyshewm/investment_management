import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import LogoutIcon from "../icons/LogoutIcon";
import Logo from "../icons/Logo";
import BriefCaseIcon from "../icons/BriefCaseIcon";
import WalletIcon from "../icons/WalletIcon";
import HouseIcon from "../icons/HouseIcon";
import AssetIcon from "../icons/AssetIcon";
import BondsIcon from "../icons/BondsIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { SidebarContext } from "../../../context/SidebarContext";
import CurrencyIcon from "../icons/CurrencyIcon";
import ClipboardIcon from "../icons/ClipboardIcon";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(() => {
        const savedState = localStorage.getItem('sidebarOpen');
        return savedState !== null ? JSON.parse(savedState) : false;
    });

    const toggleSidebar = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        localStorage.setItem('sidebarOpen', JSON.stringify(newState));
    };

    useEffect(() => {
        const savedState = localStorage.getItem('sidebarOpen');
        if (savedState !== null) {
            setIsOpen(JSON.parse(savedState));
        }
        const savedActiveItem = localStorage.getItem("activeItem");
        if (savedActiveItem) {
            setActiveItem(savedActiveItem);
        }
    }, []);

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const handleSignOut = async () => {
        await fetch('/auth/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    authContext.setIsAuthenticated(false);
                    localStorage.setItem('selectedPortfolioId', null);
                    navigate('/auth');
                }
            })
            .catch(error => {
                console.error('Ошибка при выходе из учетной записи:', error);
            });
    };

    const { activeItem, setActiveItem } = useContext(SidebarContext);
    const location = useLocation();
    useEffect(() => {
        const path = location.pathname.replace("/", "");
        setActiveItem(path);
    }, [location.pathname, setActiveItem]);

    return (
        <div className={`sidebar ${isOpen ? '' : 'close'}`}>
            <header>
                <div className="sidebar__logo">
                    <Logo />
                </div>
                <hr />
                <i className="toggle" onClick={toggleSidebar}><ArrowRightIcon /></i>
            </header>
            <div className="sidebar__container">
                <ul className="sidebar__list">
                    <li data-text="Главная" className={activeItem === "dashboard" ? "clicked" : ""}>
                        <Link to={"/dashboard"}>
                            <div className="link-content">
                                <HouseIcon stroke={"currentColor"} />
                                <span className="text">Главная</span>
                            </div>
                        </Link>
                    </li>
                    <li data-text="Портфели" className={activeItem === "manage-portfolios" ? "clicked" : ""}>
                        <Link to={"/manage-portfolios"}>
                            <div className="link-content">
                                <BriefCaseIcon stroke={"currentColor"} />
                                <span className="text">Портфели</span>
                            </div>
                        </Link>
                    </li>
                    <li data-text="Операции" className={activeItem === "assets" ? "clicked" : ""}>
                        <Link to={"/assets"}>
                            <div className="link-content">
                                <ClipboardIcon />
                                <span className="text">Операции</span>
                            </div>
                        </Link>
                    </li>
                    <li data-text="Активы" className={activeItem === "portfolio" ? "clicked" : ""}>
                        <Link to={"/portfolio"}>
                            <div className="link-content">
                                <WalletIcon stroke={"rgba(255, 255, 255, 0.8)"}/>
                                <span className="text">Активы</span>
                            </div>
                        </Link>
                    </li>
                    <hr />
                    <li data-text="Акции" className={activeItem === "shares" ? "clicked" : ""}>
                        <Link to={"/shares"}>
                            <div className="link-content">
                                <AssetIcon fill={"currentColor"} />
                                <span className="text">Акции</span>
                            </div>
                        </Link>
                    </li>
                    <li data-text="Облигации" className={activeItem === "bonds" ? "clicked" : ""}>
                        <Link to={"/bonds"}>
                            <div className="link-content">
                                <BondsIcon stroke={"currentColor"} />
                                <span className="text">Облигации</span>
                            </div>
                        </Link>
                    </li>
                    <li data-text="Валюта" className={activeItem === "currencies" ? "clicked" : ""}>
                        <Link to={"/currencies"} >
                            <div className="link-content">
                                <CurrencyIcon stroke={"currentColor"} />
                                <span className="text">Валюта</span>
                            </div>
                        </Link>
                    </li>
                </ul>
                <div className="sidebar__btns">
                    <button data-text="Выйти" onClick={handleSignOut}>
                        <LogoutIcon />
                        <span className="text">Выйти</span>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Sidebar;
