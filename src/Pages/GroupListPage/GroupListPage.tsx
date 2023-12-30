import "./GroupListPage.sass"
import {useEffect} from "react";
import SearchBar from "./SearchBar/SearchBar";
import DropdownMenu from "/src/Components/DropdownMenu/DropdownMenu";
import FacultiesMenu from "./FacultiesMenu/FacultiesMenu";
import {Response} from "/src/Types";
import {COURSES, EDUCATION_TYPES, DOMEN, requestTime} from "/src/Consts";
import GroupCard from "./GroupCard/GroupCard";
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios";
import {useGroupFilters} from "../../hooks/useGroupFilters";

const GroupListPage = () => {

    const { groups, setGroups, course, setCourse, education_type, setEducationType, query, selectedFaculties } = useGroupFilters();

    const searchGroups = async () => {

        try {

            const response:Response = await axios(`${DOMEN}/api/groups/search?course=${course}&education_type=${education_type}&query=${query}&faculties=[${selectedFaculties}]`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (response.status == 200){
                setGroups(response.data)
            }

        } catch (e) {


        }
    }

    useEffect(() => {
        searchGroups()
    }, [course, education_type, query, selectedFaculties])

    const cards = groups.map(group  => (
        <GroupCard group={group} key={group.id}/>
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
                            setCourse(id)
                        }}
                    />

                    <DropdownMenu
                        options={EDUCATION_TYPES}
                        defaultTitle="Вариант обучения"
                        appendDefaultTitle={false}
                        setSelectedOption={(id) => {
                            setEducationType(id)
                        }}
                    />

                    <SearchBar />

                </div>

                <div className={"bottom"}>

                    <FacultiesMenu />

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

export default GroupListPage;