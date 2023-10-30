import {useDispatch, useSelector} from 'react-redux';
import {updateLesson} from "../store/lessonSlice";

export function useLesson() {
	const lesson = useSelector(state => state.lesson.lesson);

	const dispatch = useDispatch()

	const setLesson = (value) => {
		dispatch(updateLesson(value))
	}

	return {
		lesson,
		setLesson
	};
}