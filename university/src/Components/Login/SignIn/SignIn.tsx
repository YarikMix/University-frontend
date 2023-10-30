import "../Login.sass"
import {FaLock} from "react-icons/fa6";
import {GrMail} from "react-icons/gr";
import {Response} from "/src/Types";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {errorMessage, successMessage} from "/src/Toasts/Toasts";
import {useToken} from "/src/hooks/useToken";
import {useAuth} from "../../../hooks/useAuth";




const SignIn = () => {

	const navigate = useNavigate()

	const { setToken } = useToken()
	const { setUser } = useAuth()

	const login = async (formData) => {

		try {
			const response:Response = await axios(`http://127.0.0.1:8000/api/login/`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				data: formData as FormData
			})

			console.log(response.headers)
			console.log(response.headers['set-cookies'])

			setToken(response.data['access_token'])

			const permissions = {
				is_authenticated: true,
				is_moderator: response.data["is_moderator"],
				user_id: response.data["user_id"],
				user_name: response.data["name"],
				user_email: response.data["email"]
			}

			setUser(permissions)

			navigate("/home");

			successMessage(response.data["name"])

		} catch {
			errorMessage()
		}
	}

	const handleSubmit = async (e) => {

		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)

		login(formData)
	}


	return (
		<div className="auth-container">

			<div className="header">

				<div className="text">
					Вход
				</div>

			</div>

			<form className="inputs" action="POST" onSubmit={(e) => handleSubmit(e)}>

				<div className="input">
					<GrMail />
					<input type="email" name="email" placeholder="Почта"/>
				</div>

				<div className="input">
					<FaLock />
					<input type="password" name="password"  placeholder="Пароль"/>
				</div>


				<div className="sign-up-link-container">
					<Link to="/auth/register" style={{ textDecoration: 'none' }}>
						<span> Ещё нет аккаунта? </span>
					</Link>
				</div>


				<button className="submit-button">
					Войти
				</button>

			</form>

		</div>
	)
}

export default SignIn;