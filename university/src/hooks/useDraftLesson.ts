import {useDispatch, useSelector} from 'react-redux';
import {
	updateDay,
	updateLesson,
	updateTime,
	updateGroups,
	updateDiscipline,
	updateAudience,
	updateTeacher
} from "../store/draftLessonSlice";
import axios from "axios";
import {DOMEN} from "../Consts";
import {useToken} from "./useToken";
import {requestErrorMessage} from "../Toasts/Toasts";

export function useDraftLesson() {

	const {access_token} = useToken()

	const lesson = useSelector(state => state.draftLesson.lesson);

	const dispatch = useDispatch()

	const setLesson = (value) => {
		dispatch(updateLesson(value))
	}

	const setGroups = (value) => {
		dispatch(updateGroups(value))
	}

	const setDay = (value) => {
		dispatch(updateDay(value))
	}

	const setTime = (value) => {
		dispatch(updateTime(value))
	}

	const setDiscipline = (value) => {
		dispatch(updateDiscipline(value))
	}

	const setAudience = (value) => {
		dispatch(updateAudience(value))
	}

	const setTeacher = (value) => {
		dispatch(updateTeacher(value))
	}

	const saveLesson = async () => {
		try {

			await axios(`${DOMEN}/api/lessons/${lesson.id}/update/`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': access_token
				},
				data: lesson
			})

		} catch (e) {
			requestErrorMessage()
		}
	}

	return {
		lesson,
		setLesson,
		setGroups,
		setDay,
		setTime,
		setDiscipline,
		setAudience,
		setTeacher,
		saveLesson
	};
}