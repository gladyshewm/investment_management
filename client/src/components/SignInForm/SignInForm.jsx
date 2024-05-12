import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./SignInForm.css";
import AuthContext from "../../context/AuthContext";
import Logo from "../UI/icons/Logo";
import useInput from "../hooks/useInput";

const SignInForm = () => {
    const [error, setError] = useState(null);
    const [activeLink, setActiveLink] = useState(null);
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const email = useInput('', { isEmpty: true, isEmail: true });
    const password = useInput('', { isEmpty: true, minLength: 6 });

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await fetch('/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.value, password: password.value }),
            })
                .then(response => {
                    if (!response.ok) {
                        setError('Неправильные учётные данные');
                        return;
                    }
                    context.setIsAuthenticated(true);
                    navigate('/auth');
                })
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        if (location.pathname === "/auth") {
            setActiveLink("/auth");
        } else if (location.pathname === "/auth/reg") {
            setActiveLink("/auth/reg");
        } else {
            setActiveLink(null);
        }
    }, [location.pathname]);

    return (
        <div className="signin-form">
            <div className="logo-block">
                <Logo />
            </div>
            <div className="signin-block">
                <div className="signin-block__main">
                    <form className="form" onSubmit={handleSignIn}>
                        <div className="auth-links">
                            <Link className={activeLink === "/auth" ? "active" : ""} to={"/auth"}>Вход</Link>
                            <Link className={activeLink === "/auth/reg" ? "active" : ""} to={"/auth/reg"}>Регистрация</Link>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <div>
                            <input
                                className="email-input"
                                placeholder="Email"
                                name="email"
                                type="email"
                                value={email.value}
                                onChange={e => email.onChange(e)}
                                onBlur={e => email.onBlur(e)}
                            />
                            {(email.isDirty && email.isEmpty) && <div className="onblur-text">{email.isEmpty}</div>}
                            {(!email.isEmpty && email.isDirty && email.isEmailError) && <div className="onblur-text">{email.isEmailError}</div>}
                        </div>
                        <div>
                            <input
                                className="password-input"
                                placeholder="Пароль"
                                name="password"
                                type="password"
                                value={password.value}
                                onChange={e => password.onChange(e)}
                                onBlur={e => password.onBlur(e)}
                            />
                            {(password.isDirty && password.isEmpty) && <div className="onblur-text">{password.isEmpty}</div>}
                            {(!password.isEmpty && password.isDirty && password.minLengthError) && <div className="onblur-text">{password.minLengthError}</div>}
                        </div>
                        <button disabled={!email.validInput || !password.validInput} type="submit">Войти</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default SignInForm;
