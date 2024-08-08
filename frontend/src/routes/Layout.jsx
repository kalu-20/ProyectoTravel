import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useContext, useEffect} from "react";
import {ProfileContext} from "../contexts/ProfileContext.jsx";

function isTokenExpired (date1, date2, timeSpan) {

    const timeDifference = Math.abs(date2 - date1);
    const hoursDifference = timeDifference / 1000;

    return hoursDifference > timeSpan;
}

function Layout() {

    const navigate = useNavigate();
    const location = useLocation();

    const { state, dispatch } = useContext(ProfileContext)

    const currPath = location.pathname;

    useEffect(() => {
        const currTime = new Date();
        const loginTime = new Date(
            JSON.parse(localStorage.getItem('loginDate'))
        );

        if (isTokenExpired(loginTime, currTime, 60 * 60 * 5)) {
            dispatch({ type: 'LOGOUT' })
        }
        else if (!state.isAuthenticated && localStorage.getItem('loginDate')) {
            const storedState = JSON.parse(localStorage.getItem('state'))

            dispatch({
                type: 'LOGIN',
                token: storedState.token,
            })
            dispatch({
                type: 'PROFILE',
                profile: storedState.profile
            })

            navigate(currPath);
        }
    }, []);

    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default Layout;