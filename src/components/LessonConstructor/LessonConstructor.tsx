import "./LessonConstructor.sass"
import {useDraftLesson} from "../../hooks/lessons/useDraftLesson";
import {Link} from "react-router-dom";
import axios from "axios";
import {useToken} from "../../hooks/users/useToken";
import {useEffect} from "react";
import {api} from "../../utils/api";

const LessonConstructor = () => {

	const {lesson, setLesson} = useDraftLesson()

	const {access_token} = useToken()

	const fetchDraftLesson = async () => {

		const {data} = await api.get(`lessons/draft/`, {
			headers: {
				'authorization': access_token
			},
		})

		setLesson(data)
	}

	useEffect(() => {
		fetchDraftLesson()
	}, [])

	if (lesson == undefined) {
		return (
			<div className="lesson-constructor-container disabled">
				<span className="title">Новое занятие</span>
			</div>
		)
	}

	return (
		<Link to={`/lessons/${lesson.id}`} className="lesson-constructor-container">
			<span className="title">Новое занятие</span>
			{lesson.groups.length > 0 && <span className="badge">{lesson.groups.length}</span>}
		</Link>
	)
}

export default LessonConstructor;