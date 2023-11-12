import "./GroupCard.sass"
import {Link} from "react-router-dom";
import {Group, Response} from "/src/Types.js";
import FacultyIcon from "/src/Components/FacultyIcon/FacultyIcon";
import {motion} from "framer-motion"
import {DOMEN} from "/src/Consts";
import axios from "axios";
import {groupAddedMessage, groupAlreadyAddedMessage, requestErrorMessage} from "/src/Toasts/Toasts";
import {useAuth} from "/src/hooks/useAuth";
import {useToken} from "../../../hooks/useToken";
import {useDraftLesson} from "../../../hooks/useDraftLesson";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import {variables} from "../../../utls/variables";

const GroupCard = ({ group }: { group: Group }) => {

    const {access_token} = useToken()

    const {is_authenticated} = useAuth()

    const {setLesson} = useDraftLesson()

    const addToLesson = async () => {

        try {
            const response: Response = await axios(`${DOMEN}/api/groups/${group.id}/add_to_lesson/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': access_token
                },
            });

            if (response.status == 200) {
                groupAddedMessage(group.name, response.data["id"])
                setLesson(response.data)
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

                <FacultyIcon faculty={group.faculty} />

            </div>

            <div className="center-container">

                <span className="group-name">{group.name}</span>

            </div>

            <div className={"bottom-container " + (is_authenticated ? "authenticated" : "")}>

                <Link to={`/groups/${group.id}`}>
                    <CustomButton bg={variables.green} text="Открыть" />
                </Link>

                {is_authenticated && <CustomButton bg={variables.primary} text="Выбрать" onClick={addToLesson} /> }

            </div>

        </motion.div>

    );
}

export default GroupCard;