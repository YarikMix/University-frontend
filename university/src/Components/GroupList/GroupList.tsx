import * as React from 'react'
import "./GroupList.sass"
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResultsList from "./SearchResultsList/SearchResultsList";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import FacultiesMenu from "./FacultsMenu/FacultiesMenu";
import {
    Group,
    GroupsContextType,
    iGroupMock, iGroupsContextState
} from "../../Types";
import {COURSES, EDUCATION_TYPES} from "../../Consts";


export const GroupsContext = React.createContext<GroupsContextType>(iGroupsContextState)

const GroupList = () => {

    const [groups, setGroups] = useState<Group[]>([]);

    const [selectedCourse, setSelectedCourse] = useState<number>(-1);
    const [selectedEducationType, setSelectedEducationType] = useState<number>(-1);
    const [query, setQuery] = useState<string>("");
    const [selectedFaculties, setSelectedFaculties] = useState<number[]>([-1]);

    const searchGroups = () => {
        fetch(`http://127.0.0.1:8000/api/groups/search?course=${selectedCourse}&education_type=${selectedEducationType}&query=${query}&faculties=[${selectedFaculties}]`)
            .then((response) => {
                if (response.ok){
                    return response.json()
                }

                throw new Error('Something went wrong');
            })
            .then((results) => setGroups(results))
            .catch((error) => {

                const mockGroup:Group = iGroupMock

                setGroups([mockGroup])
            });
    }

    useEffect(() => {
        searchGroups()
    }, [selectedCourse, selectedEducationType, query, selectedFaculties])

    return (
        <GroupsContext.Provider value={{groups, setGroups}}>
            <div className="groups-wrapper">

                <div className="filters-container">

                    <div className="top">

                        <h3>Выберите группу</h3>

                        <DropdownMenu
                            options={COURSES}
                            defaultTitle="Курс"
                            appendDefaultTitle={true}
                            setSelectedOption={(id) => {
                                setSelectedCourse(id)
                            }}
                        />

                        <DropdownMenu
                            options={EDUCATION_TYPES}
                            defaultTitle="Вариант обучения"
                            appendDefaultTitle={false}
                            setSelectedOption={(id) => {
                                setSelectedEducationType(id)
                            }}
                        />

                        <SearchBar fetchData={(query) => {
                            setQuery(query)
                        }}/>

                    </div>

                    <div className={"bottom"}>

                        <FacultiesMenu
                            updateFaculties = {(faculties) => {
                                setSelectedFaculties(faculties)
                            }}
                        />

                    </div>



                </div>

                <div className="bottom">
                    <div className="group-list-wrapper">

                        <div className="top-wrapper">

                        </div>

                        <div className="center-wrapper">

                            <SearchResultsList />

                        </div>

                        <div className="bottom-wrapper">

                        </div>

                    </div>
                </div>

            </div>
        </GroupsContext.Provider>

    );
}

export default GroupList;