import "./GroupCard.sass"
import {Link} from "react-router-dom";
import {Group, Response} from "/src/Types.js";
import FacultyIcon from "../../FacultyIcon/FacultyIcon";
import {motion} from "framer-motion"
import {DOMEN} from "/src/Consts";
import axios from "axios";
import Cookies from "universal-cookie";
import {groupAddedMessage, groupAlreadyAddedMessage, requestErrorMessage} from "/src/Toasts/Toasts";
import {useAuth} from "/src/hooks/useAuth";

const GroupCard = ({ group, isMock }: { group: Group, isMock:boolean }) => {

    const cookies = new Cookies()

    const {is_authenticated} = useAuth()

    const addToLesson = async () => {

        const data = new FormData()

        data.append("access_token", cookies.get("access_token"))

        try {
            const response: Response = await axios(`${DOMEN}/api/groups/${group.id}/add_to_lesson/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: data
            });

            if (response.status == 200) {
                groupAddedMessage(group.name, response.data["id"])
            }

        } catch (e)
        {
            if (e.response.status == 409) {
                groupAlreadyAddedMessage()
            } else {
                requestErrorMessage()
            }
        }
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

                <FacultyIcon faculty_id={group.faculty} isMock={isMock}/>

            </div>

            <div className="center-container">

                <span className="group-name">{group.name}</span>

            </div>

            <div className={"bottom-container " + (is_authenticated ? "authenticated" : "")}>

                <Link to={`/groups/${group.id}`}>
                    <button className="group-info-button">Открыть</button>
                </Link>

                {is_authenticated && <button className="add-to-lesson-button" onClick={addToLesson}>Выбрать</button> }

            </div>

        </motion.div>

    );
}

export default GroupCard;