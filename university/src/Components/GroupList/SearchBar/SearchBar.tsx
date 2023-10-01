import * as React from 'react'
import {FaSearch} from "react-icons/fa";
import {useState} from "react";


const SearchBar = ({ fetchData }: { fetchData: (query: string) => void}) => {
    const [input, setInput] = useState<string>("")

    const handleChange = (value: string) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <form className="search-bar" action="/api/groups/search" method="GET">

            <input
                type="text"
                placeholder="Введите название группы"
                name="query"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit">
                <FaSearch className={"search-icon"}/>
            </button>

        </form>
    );
}

export default SearchBar;