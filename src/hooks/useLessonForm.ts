import {useDispatch, useSelector} from 'react-redux';
import {setOpen} from "../store/lessonFormSliсe";

export function useLessonForm() {
	const isOpen = useSelector(state => state.lessonForm.isOpen);

	const dispatch = useDispatch()

	const openForm = () => {
		dispatch(setOpen(true))
	}

	const closeForm = () => {
		dispatch(setOpen(false))
	}

	return {
		isOpen,
		openForm,
		closeForm
	};
}