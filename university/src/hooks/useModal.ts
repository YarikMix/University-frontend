import {useDispatch, useSelector} from 'react-redux';
import {setOpen} from "../store/modalSlise";

export function useModal() {
	const isOpen = useSelector(state => state.modal.isOpen);

	const dispatch = useDispatch()

	const setIsOpen = (value) => {
		dispatch(setOpen(value))
	}

	return {
		isOpen,
		setIsOpen
	};
}