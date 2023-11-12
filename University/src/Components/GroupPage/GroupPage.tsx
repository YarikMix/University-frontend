import "./GroupPage.sass"
import GroupInfo from "./GroupInfo/GroupInfo";
import { useParams } from "react-router-dom";
import {Group} from "../../Types";
import {Dispatch} from "react";


const GroupPage = ({ selectedGroup, setSelectedGroup }: { selectedGroup:Group | undefined, setSelectedGroup: Dispatch<Group | undefined> }) => {
    const { id } = useParams<{id?: string}>();

    if (id == undefined) {
        return (
            <div>404</div>
        )
    }

    return (
        <GroupInfo group_id={parseInt(id)} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
    )
}

export default  GroupPage;