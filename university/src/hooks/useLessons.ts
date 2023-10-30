import {useDispatch, useSelector} from 'react-redux';
import {updateLessons, updateLesson} from "../store/lessonsSlice";

export function useLessons() {
	const lessons = useSelector(state => state.lessons.lessons);

	const dispatch = useDispatch()

	const setLessons = (value) => {
		dispatch(updateLessons(value))
	}

	const setLesson = (value) => {
		dispatch(updateLesson(value))
	}

	return {
		lessons,
		setLesson,
		setLessons
	};
}