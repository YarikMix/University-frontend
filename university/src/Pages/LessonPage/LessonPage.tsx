import "./LessonPage.sass"
import LessonTimePicker from "./LessonTimePicker/LessonTimePicker";
import Trash from "../../Components/Trash/Trash";
import GroupsTagList from "/src/Components/GroupsTagList/GroupsTagList";
import {useDraftLesson} from "../../hooks/useDraftLesson";
import axios from "axios";
import {DOMEN} from "/src/Consts";
import {Response} from "/src/Types";
import {useToken} from "../../hooks/useToken";
import {lessonDeleteMessage, lessonSaveMessage, requestErrorMessage} from "../../Toasts/Toasts";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../Components/CustomButton/CustomButton";
import {variables} from "../../utls/variables";
import {debounce} from "lodash"
import {useEffect, useRef} from "react";

const LessonPage = () => {

	const {lesson, setLesson, setGroups, setDiscipline, setAudience, setTeacher, saveLesson} = useDraftLesson()

	const {access_token} = useToken()

	const navigate = useNavigate()


	const deleteLesson = async () => {

		try {

			const response: Response = await axios(`${DOMEN}/api/lessons/${lesson.id}/delete/`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': access_token
				}
			})

			if (response.status == 200)
			{
				setLesson(undefined)

				lessonDeleteMessage(lesson.id)

				navigate("/groups")
			}

		} catch (e) {
			requestErrorMessage()
		}
	}

	const updateLessonStatus = async () => {

		try {

			const response: Response = await axios(`${DOMEN}/api/lessons/${lesson.id}/update_status_user/`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': access_token
				}
			})

			if (response.status == 200) {

				navigate("/lessons")

				setLesson(undefined)

				lessonSaveMessage(response.data["id"])

			}

		} catch (e) {
			requestErrorMessage()
		}
	}

	const handleSubmit = async(e) => {

		e.preventDefault()

		await saveLesson()

		await updateLessonStatus()
	}

	const handleSave = async(e) => {
		e.preventDefault()

		await saveLesson()

		lessonSaveMessage(lesson.id)
	}


	const updateDiscipline = debounce((e) => setDiscipline(e.target.value), 1000)
	const updateAudience= debounce((e) => setAudience(e.target.value), 1000)
	const updateTeacher = debounce((e) => setTeacher(e.target.value), 1000)

	const input1 = useRef<HTMLInputElement>(null)
	const input2 = useRef<HTMLInputElement>(null)
	const input3 = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (lesson != undefined)
		{
			input1.current.value = lesson.discipline
			input2.current.value = lesson.audience
			input3.current.value = lesson.teacher
		}
	}, [])


	if (lesson == undefined)
	{
		return (
			<div className="lesson-page-wrapper empty">
				<h1>Пусто</h1>
			</div>
		)
	}

	return (
		<form className="lesson-page-wrapper" onSubmit={handleSubmit}>

			<div className="top-container">
				<h3>Занятие №{lesson.id}</h3>
			</div>

			<div className="center-container">

				<div className="left-container">

					<div className="inputs-container">

						<GroupsTagList lesson={lesson} readOnly={false} setGroups={setGroups}/>

						<input type="text" placeholder="Дисциплина" name="discipline" ref={input1} onChange={updateDiscipline} required/>

						<input type="text" placeholder="Аудитория" name="audience" ref={input2} onChange={updateAudience} required/>

						<input type="text" placeholder="Преподаватель" name="teacher" ref={input3} onChange={updateTeacher} required/>

						<input type="hidden" name="day_of_week" value={lesson.day_of_week}/>

						<input type="hidden" name="time" value={lesson.time}/>

					</div>

					<div className="buttons-container">
						<CustomButton bg={variables.primary} text="Отправить" />
						<CustomButton bg={variables.green} text="Сохранить" onClick={handleSave}/>
						<Trash onClick={deleteLesson} />
					</div>

				</div>

				<div className="right-container">

					<LessonTimePicker />

				</div>

			</div>

		</form>
	)
}

export default LessonPage;