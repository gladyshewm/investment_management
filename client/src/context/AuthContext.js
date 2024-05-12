import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                const data = await fetch('/auth/isloggedin');
                const user = await data.json();
                setIsAuthenticated(user && user.isLoggedIn);
            } catch (error) {
                console.error('Error checking user authentication:', error.message);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        isLoggedIn();
    }, [])

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;