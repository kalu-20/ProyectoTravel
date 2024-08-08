import {useContext} from "react";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {Navigate} from "react-router-dom";

function ProtectedRoute ({ children }) {
    const { state } = useContext(ProfileContext);

    if (!state.isAuthenticated) {
        return <Navigate to='/login' />
    }

    return children
}

export default ProtectedRoute;