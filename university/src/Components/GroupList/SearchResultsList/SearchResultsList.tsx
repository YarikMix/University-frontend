import * as React from 'react'
import SearchResult from "../SearchResult/SearchResults";
import {useContext} from "react";
import {GroupsContext} from "../GroupList";

const SearchResultsList = () => {

    const { groups } = useContext(GroupsContext)

    return (
       <div>
           {  groups.map(group  => (
               <SearchResult group={group} key={group.id}/>
           ))}
       </div>
    );
}

export default SearchResultsList;