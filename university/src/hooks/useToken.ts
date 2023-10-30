import Cookies from "universal-cookie";

export function useToken() {
	const cookies = new Cookies()

	const token = cookies.get("access_token");

	const setToken = (value) => {
		cookies.set("access_token", value, {path: '/university', expires: new Date(Date.now()+2592000)})
	}

	const resetToken = () => {
		cookies.set("access_token", undefined, {path: '/university', expires: new Date(Date.now()+2592000)})
	}

	return {
		token,
		setToken,
		resetToken
	};
}