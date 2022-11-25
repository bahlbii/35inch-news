import React, { useState, createContext } from "react";

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {

    const [news, setNews] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);

    return (
        <NewsContext.Provider
            value={{
                news,
                setNews,
                selectedNews,
                setSelectedNews,
            }}
        >
            {props.children}
        </NewsContext.Provider>
    )
}