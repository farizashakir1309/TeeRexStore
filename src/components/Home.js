import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import Main from "./Main";
import { useGlobalState } from '../GlobalStateContext';
import {useEffect, useState} from "react";

export default function Home (props) {
    const { state, dispatch } = useGlobalState();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        // Attach the event listener for window resize
        window.addEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (Array.isArray(props.data)) {
            dispatch({ type: 'SET_DATA', payload: props.data });
        }
    }, [props.data]);
    if(!Array.isArray(props.data)) {
        return <h1>No Data Found</h1>;
    }
    return (
    <div className="home">
    <SearchBar />
    <main>
    {!isMobile && <FilterBar />}
        <Main />
    </main>
    </div>
    )
}