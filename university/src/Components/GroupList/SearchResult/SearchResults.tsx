import * as React from 'react'
import {Link} from "react-router-dom";
import FacultyIcon from "../../FacultyIcon/FacultyIcon";
import {Group, iGroupMock} from "../../../Types.js";
import {useContext} from "react";
import {GroupsContext} from "../GroupList";


const SearchResult = ({ group }: { group: Group }) => {

    const { setGroups } = useContext(GroupsContext)

    const onDelete = () => {
        fetch(`http://127.0.0.1:8000/api/groups/${group.id}/delete/`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.ok){
                    return response.json()
                }

                throw new Error('Something went wrong');
            })
            .then((results) => {
                setGroups(results)
            })
            .catch((error) => {

            });
    }


    return (
        <div className="group" key={group.id}>

            <div className="left-container">

                <FacultyIcon faculty_id={group.faculty}/>

                <span className="group-name">{group.name}</span>

            </div>

            <div className="right-container">

                <Link to={`/groups/${group.id}`}>
                    <button className="group-info-button">Открыть</button>
                </Link>

                <button className="group-delete-button" onClick={onDelete}>Удалить</button>


            </div>
        </div>

    );
}

export default SearchResult;