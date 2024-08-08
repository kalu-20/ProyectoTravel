import {createContext} from "react";

const DataContext = createContext(
    {
        cities: [],
        places: [],
        travels: [],
    }
);

export default DataContext