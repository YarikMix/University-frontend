import "./GroupList.sass"
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar/SearchBar";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import FacultiesMenu from "./FacultsMenu/FacultiesMenu";
import {Group} from "../../Types";
import {COURSES, EDUCATION_TYPES, DOMEN, iGroupsMock, requestTime} from "../../Consts";
import GroupCard from "./GroupCard/GroupCard";
import { motion, AnimatePresence } from "framer-motion"

const GroupList = () => {

    const [groups, setGroups] = useState<Group[]>([]);

    const [query, setQuery] = useState<string>("");
    const [selectedCourse, setSelectedCourse] = useState<number>(-1);
    const [selectedFaculties, setSelectedFaculties] = useState<number[]>([-1]);
    const [selectedEducationType, setSelectedEducationType] = useState<number>(-1);

    const searchGroups = async () => {

        try {

            const response = await fetch(`${DOMEN}/api/groups/search?course=${selectedCourse}&education_type=${selectedEducationType}&query=${query}&faculties=[${selectedFaculties}]`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const groups: Group[] = await response.json()

            setGroups(groups)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        let filteredGroups:Group[] = iGroupsMock.filter(group => group.status == 1)

        filteredGroups = filteredGroups.filter((group) => group.name.toLowerCase().includes(query))

        if (selectedCourse != -1) {
            filteredGroups = filteredGroups.filter(group => group.course == selectedCourse)
        }

        if (selectedEducationType != -1) {
            filteredGroups = filteredGroups.filter(group => group.education_type == selectedEducationType)
        }

        if (!selectedFaculties.includes(-1)) {
            filteredGroups = filteredGroups.filter(group => selectedFaculties.includes(group.faculty))
        }

        setGroups(filteredGroups)
    }

    useEffect(() => {
        searchGroups()
    }, [selectedCourse, selectedEducationType, query, selectedFaculties])

    const cards = groups.map(group  => (
        <GroupCard group={group} setGroups={setGroups} key={group.id}/>
    ))

    return (

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


            <motion.div className="group-list-wrapper">

                <AnimatePresence>

                    { cards }

                </AnimatePresence>

            </motion.div>


        </div>

    );
}

export default GroupList;