import React, { useState, useEffect } from "react";
import "./SignUpForm.css";
import Logo from "../UI/icons/Logo";
import ArrowLeftIcon2 from "../UI/icons/ArrowLeftIcon2";
import { Link, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";

const SignUpForm = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [activeLink, setActiveLink] = useState(null);
    const location = useLocation();
    const email = useInput('', { isEmpty: true, isEmail: true });
    const password = useInput('', { isEmpty: true, minLength: 6 });
    const confirmPassword = useInput('', { isEmpty: true, minLength: 6, passwordsMatch: password.value });

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/auth/reg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.value, password: password.value }),
            });

            if (!response.ok) {
                const errorJson = await response.json();
                const errorMessage = errorJson.error === "User already registered" ? "Пользователь с таким Email уже существует" : 'Возникла ошибка при регистрации';
                setError(errorMessage);
                return;
            }
            setError(null);
            setSuccess('Аккаунт успешно создан!');
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
                    {success && !error && (
                        <div className="success-message-block">
                            <div className="success-message">{success}</div>
                            <Link to={"/auth"}>
                                <ArrowLeftIcon2 />
                                На страницу входа
                            </Link>
                        </div>
                    )}
                    <form className="form" onSubmit={handleSignUp}>
                        <div className="auth-links">
                            <Link className={activeLink === "/auth" ? "active" : ""} to={"/auth"}>Вход</Link>
                            <Link className={activeLink === "/auth/reg" ? "active" : ""} to={"/auth/reg"}>Регистрация</Link>
                        </div>
                        {error && !success && (
                            <div style={{ color: '#b91919' }}>{error}</div>
                        )}
                        <div>
                            <input
                                className="email-input"
                                placeholder="Email"
                                name="email" type="email"
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
                        <div>
                            <input
                                className="password-input"
                                placeholder="Подтвердите пароль"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword.value}
                                onChange={e => confirmPassword.onChange(e)}
                                onBlur={e => confirmPassword.onBlur(e)}
                            />
                            {(confirmPassword.isDirty && confirmPassword.isEmpty) && <div className="onblur-text">{confirmPassword.isEmpty}</div>}
                            {(!confirmPassword.isEmpty && confirmPassword.isDirty && confirmPassword.passwordsMatchError) && <div className="onblur-text">{confirmPassword.passwordsMatchError}</div>}
                        </div>
                        <button disabled={!email.validInput || !password.validInput || !confirmPassword.validInput} type="submit">Зарегистрироваться</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default SignUpForm;
