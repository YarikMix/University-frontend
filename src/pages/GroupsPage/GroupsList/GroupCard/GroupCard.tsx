import "./GroupCard.sass"
import {Link} from "react-router-dom";
import {Group} from "/src/utils/types.js";
import FacultyIcon from "/src/components/FacultyIcon/FacultyIcon";
import {motion} from "framer-motion"
import {useAuth} from "/src/hooks/users/useAuth";
import {useDraftLesson} from "../../../../hooks/lessons/useDraftLesson";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/variables";

const GroupCard = ({ group }: { group: Group }) => {

    const {is_authenticated} = useAuth()

    const {lesson, addGroupToLesson, deleteGroupFromLesson} = useDraftLesson()

    const addToLesson = async () => {
        await addGroupToLesson(group)
    }

    const deleteFromLesson = async () => {
        await deleteGroupFromLesson(group)
    }

    const is_chosen = lesson?.groups.find(g => g.id == group.id)

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

                {is_authenticated && !is_chosen &&
                    <CustomButton bg={variables.primary} text="Добавить" onClick={addToLesson} />
                }

                {is_authenticated && is_chosen &&
                    <CustomButton bg={variables.red} text="Удалить" onClick={deleteFromLesson} />
                }

            </div>

        </motion.div>

    );
}

export default GroupCard;