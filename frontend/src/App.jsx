import {useEffect, useState} from 'react'
import {RouterProvider} from "react-router-dom";

import DataContext from "./contexts/DataContext.jsx";
import router from './routes/Router.jsx'
import {createTheme, ThemeProvider} from "@mui/material";
import {ProfileProvider} from "./contexts/ProfileContext.jsx";
import fetchRequest from "./util/fetchRequest.jsx";

const theme = createTheme({
    palette: {
        primary: {
            main: '#060e35',
            secondary: '#0e87ff',
            textPrimary: '#f2f9ff',
            textSecondary: '#95a1ac',
        },
        secondary: {
            main: '#f2f9ff',
            secondary: '#77b9f6',
        },
        whiteColor: {
            main: '#ffffff'
        }
    },
})

function App() {

    const [cities, setCities] = useState([]);
    const [places, setPlaces] = useState([]);
    const [travels, setTravels] = useState([]);

    useEffect(() => {
        const getCities = async () => {
            const res = await fetchRequest('cities',{
                method: 'GET'
            })

            const response = await res.json()
            if (response.success) {
                setCities(response.data)
            }
        }
        getCities()

        const getPlaces = async () => {
            const res = await fetchRequest('places',{
                method: 'GET'
            })

            const response = await res.json()
            if (response.success) {
                setPlaces(response.data)
            }
        }
        getPlaces()

        const getTravels = async () => {
            const res = await fetchRequest('travels', {
                method: 'GET'
            })

            const response = await res.json();
            if (response.success) {
                setTravels(response.data)
            }
        }
        getTravels()
    }, []);

    return (
        <ProfileProvider>
            <DataContext.Provider value={{ cities, places, travels }}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
            </DataContext.Provider>
        </ProfileProvider>
    )
}

export default App
