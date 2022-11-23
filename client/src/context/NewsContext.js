import React, { useState, createContext } from "react";

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {

    const [news, setNews] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);
    const [user, setUser] = useState(null);

    return (
        <NewsContext.Provider
            value={{
                news,
                setNews,
                selectedNews,
                setSelectedNews,
                user,
                setUser,
            }}
        >
            {props.children}
        </NewsContext.Provider>
    )
}