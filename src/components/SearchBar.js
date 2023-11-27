import "../styles/_searchbar.css";
import {useState} from "react";
import { useGlobalState } from '../GlobalStateContext';

export default function SearchBar() {
    const { state, dispatch } = useGlobalState();
    const [searchText, setSearchText] = useState('');
    function handleSearch(e) {
        e.preventDefault();
        dispatch({
            type: 'SEARCH',
            payload: searchText
        })
        setSearchText("");
        return;
    }
    return (
        <div className="searchbar">
            <input 
                type="text" 
                placeholder="Search for Prodcts..."
                value={searchText}
                onChange={(e)=> setSearchText(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}