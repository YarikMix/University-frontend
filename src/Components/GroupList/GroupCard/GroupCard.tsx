import {Dispatch} from "react";
import {Link} from "react-router-dom";
import {Group} from "../../../Types.js";
import FacultyIcon from "../../FacultyIcon/FacultyIcon";
import {motion} from "framer-motion"
import {DOMEN, iGroupsMock, requestTime} from "../../../Consts";

const GroupCard = ({ group, setGroups }: { group: Group, setGroups: Dispatch<Group[]> }) => {

    const onDelete = async () => {

        try {
            const response = await fetch(`${DOMEN}/api/groups/${group.id}/delete/`, {
                method: "DELETE",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok){
                deleteMockGroup()
            }

            const groups: Group[] = await response.json()

            setGroups(groups)

        } catch (e) {

            deleteMockGroup()

        }
    }

    const deleteMockGroup = () => {

        group.status = 2

        setGroups(iGroupsMock.filter(group => group.status == 1))

    }

    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{scale: 1.1}}
            className="group"
            key={group.id}>

            <div className="top-container">

                <FacultyIcon faculty_id={group.faculty}/>

            </div>

            <div className="center-container">

                <span className="group-name">{group.name}</span>

            </div>

            <div className="bottom-container">

                <Link to={`/groups/${group.id}`}>
                    <button className="group-info-button">Открыть</button>
                </Link>

                <button className="group-delete-button" onClick={onDelete}>Удалить</button>

            </div>

        </motion.div>

    );
}

export default GroupCard;