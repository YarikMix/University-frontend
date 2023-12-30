import {FaSearch} from "react-icons/fa";
import {useGroupFilters} from "../../../hooks/useGroupFilters";


const SearchBar = () => {

    const {query, setQuery} = useGroupFilters()

    const handleChange = (value: string) => {
        setQuery(value)
    }

    return (
        <form className="search-bar" action="/api/groups/search" method="GET" onSubmit={(e) => e.preventDefault()} >

            <input
                type="text"
                placeholder="Введите название группы"
                name="query"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit">
                <FaSearch className={"search-icon"}/>
            </button>

        </form>
    );
}

export default SearchBar;