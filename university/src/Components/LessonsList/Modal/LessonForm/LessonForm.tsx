import "./LessonForm.sass"
import {BACKGROUNDS, DOMEN, LESSON_DAY, LESSON_TIME, STATUSES} from "/src/Consts";
import * as React from "react";
import {FaRegStickyNote} from "react-icons/fa";
import {MdOutlineWorkHistory} from "react-icons/md";
import {AiFillCheckCircle, AiFillDelete} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import {Response} from "/src/Types";
import {useState} from "react";
import DropdownMenu from "../../../DropdownMenu/DropdownMenu";
import Trash from "../../../Trash/Trash";
import {emptyGroupsMessage, lessonDeleteMessage, lessonUpdateMessage} from "../../../../Toasts/Toasts";
import {useToken} from "../../../../hooks/useToken";
import {useLesson} from "../../../../hooks/useLesson";
import {useLessons} from "../../../../hooks/useLessons";
import styled from "styled-components";
import GroupsTagList from "./GroupsTagList/GroupsTagList";
import axios from "axios";

const LessonForm = ({closeModal}) => {

	const { lesson } = useLesson()

	const [selectedDay, setSelectedDay] = useState<number>(1)
	const [selectedTime, setSelectedTime] = useState<number>(1)

	const {setLesson, setLessons} = useLessons()

	const {token} = useToken()

	const statusIcons : Record<number, React.ReactElement> = {
		1: <FaRegStickyNote className={"status-icon"} />,
		2: <MdOutlineWorkHistory className={"status-icon"} />,
		3: <AiFillCheckCircle className={"status-icon"} />,
		4: <ImCancelCircle className={"status-icon"} />,
		5: <AiFillDelete className={"status-icon"} />,
	}

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
				closeModal()
			}

		} catch (e) {

		}
	}

	const updateStatus = async () => {

		try {

			const formData = new FormData()

			formData.append("status", "2")

			const response: Response = await axios(`${DOMEN}/api/lessons/${lesson.id}/update_status_user/`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': `${token}`
				},
				data: formData
			})

			if (response.status == 200) {

				setLesson(response.data)

				closeModal()

				lessonUpdateMessage(response.data["id"])

			}

		} catch (e) {

		}

	}

	const handleSubmit = async (e) => {

		e.preventDefault()

		if (lesson.groups.length == 0)
		{
			emptyGroupsMessage()
			return
		}

		try {

			const formData = new FormData(e.target as HTMLFormElement)

			formData.append("day_of_week", String(selectedDay))
			formData.append("time", String(selectedTime))

			const response: Response = await axios(`${DOMEN}/api/lessons/${lesson.id}/update/`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': `${token}`
				},
				data: formData
			})

			if (response.status == 200) {
				updateStatus()
			}

		} catch (e) {

		}

	}

	if (lesson == undefined)
	{
		return (
			<div>

			</div>
		)
	}

	if (lesson.status != 1)
	{
		return (
			<form className="input-container-wrapper disabled">

				{lesson.status == 1 && <Trash onClick={deleteLesson} />}

				<span className="form-title">Занятие №{lesson.id}</span>

				<StatusInfoContainer className={"status-info-container"} theme={BACKGROUNDS[lesson.status]}>

					<span className={"selected"}>{STATUSES.find(status => status.id == lesson.status).name}</span>
					{statusIcons[lesson.status]}

				</StatusInfoContainer>

				<GroupsTagList isEnabled={false}/>

				<div className="input-container">
					<span>{LESSON_TIME.find(time => time.id == lesson.time).name}</span>
				</div>

				<div className="input-container">
					<span>{LESSON_DAY.find(day => day.id == lesson.day_of_week).name}</span>
				</div>

				<div className="input-container">
					<span>{lesson.discipline}</span>
				</div>

				<div className="input-container">
					<span>{lesson.audience}</span>
				</div>

				<div className="input-container">
					<span>{lesson.teacher}</span>
				</div>

			</form>

		)

	}

	return (
		<form className="input-container-wrapper" action="POST" onSubmit={(e) => handleSubmit(e)}>

			<Trash top={15} left={15} onClick={deleteLesson}/>

			<span className="form-title">Занятие №{lesson.id}</span>

			<StatusInfoContainer className={"status-info-container"} theme={BACKGROUNDS[lesson.status]}>

				<span className={"selected"}>{STATUSES.find(status => status.id == lesson.status).name}</span>
				{statusIcons[lesson.status]}

			</StatusInfoContainer>

			<GroupsTagList />

			<DropdownMenu options={LESSON_TIME} defaultTitle={LESSON_TIME.find(status => status.id == lesson.status).name} appendDefaultTitle="" selectedOption={selectedTime} setSelectedOption={setSelectedTime} />
			<DropdownMenu options={LESSON_DAY} defaultTitle={LESSON_DAY.find(status => status.id == lesson.status).name} appendDefaultTitle="" selectedOption={selectedDay} setSelectedOption={setSelectedDay} />

			<div className="input-container">
				<input type="text" name="discipline" placeholder="Дисциплина" required="required"/>
				{statusIcons[lesson.discipline]}
			</div>

			<div className="input-container">
				<input type="text" name="teacher" placeholder="Преподаватель" required="required"/>
				{statusIcons[lesson.teacher]}
			</div>

			<div className="input-container">
				<input type="text" name="audience" placeholder="Аудитория" required="required"/>
				{statusIcons[lesson.audience]}
			</div>

			<button className="submit-button">Отправить</button>

		</form>

	)
}

const StatusInfoContainer = styled.div`
    background-color: ${( props ) => props.theme };
`

export default LessonForm;