import "./GroupsPage.sass"
import GroupsTable from "./GroupsTable/GroupsTable";
import {useAuth} from "../../hooks/users/useAuth";
import GroupsList from "./GroupsList/GroupsList";
import GroupsFilters from "./GroupsFilters/GroupsFilters";
import React, {useEffect} from "react";

const GroupsPage = () => {

    const {is_moderator} = useAuth()

    useEffect(() => {
        document.title = "Группы"
    }, [])

    return (

        <div className="groups-wrapper">

            <GroupsFilters />

            {!is_moderator && <GroupsList /> }

            {is_moderator && <GroupsTable /> }

        </div>

    );
}

export default GroupsPage;