import "./LessonCard.sass"
import {FaRegStickyNote} from "react-icons/fa";
import {useModal} from "/src/hooks/useModal";
import {useLesson} from "/src/hooks/useLesson";
import React from "react";
import axios from "axios";
import {DOMEN, STATUSES} from "/src/Consts";
import {Response, Lesson} from "/src/Types";
import {useToken} from "/src/hooks/useToken";
import {motion} from "framer-motion";
import {MdOutlineWorkHistory} from "react-icons/md";
import {AiFillCheckCircle, AiFillDelete} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import {lessonDeleteMessage} from "../../../Toasts/Toasts";
import Trash from "../../Trash/Trash";
import {useLessons} from "../../../hooks/useLessons";

const LessonCard = ({ lesson }:{lesson:Lesson}) => {

	const {setLessons} = useLessons()

	const {setLesson} = useLesson()

	const {setIsOpen} = useModal()

	const {token} = useToken()

	const deleteLesson = async () => {
		try {

			const response: Response = await axios(`${DOMEN}/api/lessons/${lesson.id}/delete/`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': `${token}`
				}
			})

			if (response.status == 200)
			{
				setLessons(response.data)
				lessonDeleteMessage(lesson.id)
			}

		} catch (e) {

		}
	}

	const fetchLesson = async () => {

		const response: Response = await axios(`${DOMEN}/api/lessons/${lesson.id}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				'authorization': `${token}`
			}
		});

		if (response.status == 200)
		{
			setLesson(response.data)
		}

	}

	const showModal = () => {
		fetchLesson()
		setIsOpen(true)
	}

	const statusIcons : Record<number, React.ReactElement> = {
		1: <FaRegStickyNote className={"status-icon"} />,
		2: <MdOutlineWorkHistory className={"status-icon"} />,
		3: <AiFillCheckCircle className={"status-icon"} />,
		4: <ImCancelCircle className={"status-icon"} />,
		5: <AiFillDelete className={"status-icon"} />,
	}

	return (
		<motion.div
			layout
			animate={{ opacity: 1, scale: 1 }}
			initial={{ opacity: 0, scale: 0 }}
			exit={{ opacity: 0, scale: 0 }}
			whileHover={{scale: 1.1}}
			className="lesson-card"
			key={lesson.id}>

			<h3>Занятие №{lesson.id}</h3>
			<span>Статус: {STATUSES.find(status => status.id == lesson.status).name}</span>

			{statusIcons[lesson.status]}

			{lesson.status == 1 && <Trash onClick={deleteLesson} />}

			<button className="open-card-btn" onClick={showModal}>Открыть</button>

		</motion.div>
	)
}

export default LessonCard;