import "./GroupsList.sass"
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import GroupCard from "./GroupCard/GroupCard";
import {useGroups} from "../../../hooks/groups/useGroups";

const GroupsList = () => {

    const [groups, setGroups] = useState([])
    const [fetching, setFetching] = useState(true)

    const { course, education_type, query, selectedFaculties, searchGroups, queryPageIndex, setGroupsPage } = useGroups()

    useEffect(() => {

        const pageSize = 10

        searchGroups(queryPageIndex, pageSize).then(data => {
            setGroups([...groups, ...data["groups"]])
            setGroupsPage(queryPageIndex + 1)
        }).finally(() => setFetching(false))

    }, [fetching])

    useEffect(() => {
        setGroups([])
        setGroupsPage(0)
        setFetching(!fetching)
    }, [course, education_type, query, selectedFaculties])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    const scrollHandler = async (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) {
            setFetching(true)
        }
    }

    const cards = groups.map(group  => (
        <GroupCard group={group} key={group.id}/>
    ))

    return (
        <motion.div className="group-list-wrapper">

            <AnimatePresence>

                { cards }

            </AnimatePresence>

        </motion.div>
    )
}

export default GroupsList