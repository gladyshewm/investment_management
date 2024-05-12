import { createContext, useContext, useState } from "react";

const BondsContext = createContext();
export const useBondsData = () => useContext(BondsContext);

export const BondsProvider = ({ children }) => {
    const [bondsData, setBondsData] = useState(null);

    const value = {
        bondsData,
        setBondsData
    };

    return (
        <BondsContext.Provider value={value}>
            {children}
        </BondsContext.Provider>
    )

}
