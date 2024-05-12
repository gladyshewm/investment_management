import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [activeItem, setActiveItem] = useState("");

    const value = {
        activeItem,
        setActiveItem
    };

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )

}
