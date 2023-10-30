import {useDispatch, useSelector} from 'react-redux';
import {updateGroup} from "../store/groupSlice";

export function useGroup() {
	const group = useSelector(state => state.group.group);

	const dispatch = useDispatch()

	const setGroup= (value) => {
		dispatch(updateGroup(value))
	}

	return {
		group,
		setGroup
	};
}