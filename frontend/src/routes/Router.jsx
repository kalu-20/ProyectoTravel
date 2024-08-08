import {createBrowserRouter, Outlet} from "react-router-dom";
import {TravelProvider} from "../contexts/TravelContext.jsx";
import Layout from "./Layout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Travels from "../pages/Travels.jsx";
import Travel from "../pages/Travel.jsx";
import NotFound from "../pages/NotFound.jsx";
import MyTravels from "../pages/MyTravels.jsx";
import Hosting from "../pages/Hosting.jsx";
import Excursion from "../pages/Excursion.jsx";
import Promos from "../pages/Promos.jsx";
import Festival from "../pages/Festival.jsx";
import Museum from "../pages/Museum.jsx";
import Food from "../pages/Food.jsx";
import PlaceForm from "../pages/PlaceForm.jsx";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/festivals',
                element: <Festival />
            },
            {
                path: '/museums',
                element: <Museum />
            },
            {
                path: '/foods',
                element: <Food />
            },
            {
                path: '/hostings',
                element: <Hosting />
            },
            {
                path: '/excursions',
                element: <Excursion />
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            {
                path: '/my-travels',
                element: (
                    <ProtectedRoute>
                        <MyTravels />
                    </ProtectedRoute>
                )
            },
            {
                path: '/create-place',
                element: (
                    <ProtectedRoute>
                        <PlaceForm />
                    </ProtectedRoute>
                )
            },
            {
                element: (
                    <TravelProvider>
                        <Outlet />
                    </TravelProvider>
                ),
                children: [
                    {
                        path: '/travels',
                        element: <Travels />
                    },
                    {
                        path: '/travels/:id',
                        element: <Travel />
                    },
                    {
                        path: '/promos',
                        element: <Promos />
                    },
                ]
            },
            {
                path: '/login',
                element: <LoginForm />
            },
            {
                path: '/sign-up',
                element: <RegisterForm />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
])

export default router;