import {createContext, useReducer} from "react";

const DEFAULT_USER_STATE = {
    isAuthenticated: false,
    token: undefined,
    profile: undefined,
}

const ProfileContext = createContext(DEFAULT_USER_STATE)

function reducer (state, action) {
    let newState;
    switch (action.type) {
        case 'LOGIN':
            newState = {
                ...state,
                isAuthenticated: true,
                token: action.token
            }
            localStorage.setItem('state', JSON.stringify(newState))
            return newState;
        case 'PROFILE':
            newState = {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.profile
                },
            }
            localStorage.setItem('state', JSON.stringify(newState))
            return newState
        case 'LOGOUT':
            localStorage.removeItem('loginDate')
            localStorage.removeItem('state')
            return DEFAULT_USER_STATE
        default:
            return state
    }
}

function ProfileProvider ({ children }) {
    const [state, dispatch] = useReducer(reducer, DEFAULT_USER_STATE)

    return (
        <ProfileContext.Provider value={{state, dispatch}}>
            {children}
        </ProfileContext.Provider>
    )
}

export { ProfileProvider, ProfileContext }