import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/authSlice";
import {Response} from "../Types";
import axios from "axios";
import {useToken} from "./useToken";

export function useAuth() {
	const {is_authenticated, is_moderator, user_id, user_name, user_email} = useSelector(state => state.user);

	const dispatch = useDispatch()

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const sendRequest = async() => {

		const { token } = useToken()

		try {

			const response: Response = await axios(`http://localhost:8000/api/logout/`, {
				method: "POST",
				headers: {
					'authorization': `${token}`
				}
			})

			if (response.status == 200)
			{
				console.log(response.data)
			}

		} catch (error) {

		}
	}

	const logOut = async () => {

		sendRequest()

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