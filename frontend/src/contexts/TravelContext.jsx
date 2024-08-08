import {createContext, useReducer, useState} from "react";

const TravelContext = createContext({})

function TravelProvider ({ children }) {
    //const [state, dispatch] = useReducer(reducer, DEFAULT_TRAVEL_STATE)
    const [travel, setTravel] = useState({});

    return (
        <TravelContext.Provider value={{ travel, setTravel }}>
            {children}
        </TravelContext.Provider>
    )
}

export { TravelContext, TravelProvider };