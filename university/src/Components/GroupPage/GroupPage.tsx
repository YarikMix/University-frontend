import "./GroupPage.sass"
import GroupInfo from "./GroupInfo/GroupInfo";
import { useParams } from "react-router-dom";


const GroupPage = () => {
    const { id } = useParams<{id?: string}>();

    if (id == undefined) {
        return (
            <div>404</div>
        )
    }

    return (
        <GroupInfo group_id={parseInt(id)} />
    )
}

export default  GroupPage;