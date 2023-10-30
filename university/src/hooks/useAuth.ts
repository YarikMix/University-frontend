import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/authSlice";

export function useAuth() {
	const {is_authenticated, is_moderator, user_id, user_name, user_email} = useSelector(state => state.user);

	const dispatch = useDispatch()

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const logOut = () => {
		dispatch(cleanUser())
	}

	return {
		is_authenticated,
		is_moderator,
		user_id,
		user_name,
		user_email,
		setUser,
		logOut
	};
}