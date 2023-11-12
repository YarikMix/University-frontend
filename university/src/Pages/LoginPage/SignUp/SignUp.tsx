import "../Login.sass"
import {FaLock, FaUser} from "react-icons/fa6";
import {GrMail} from "react-icons/gr";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {errorMessage, successMessage} from "/src/Toasts/Toasts";
import {useToken} from "../../../hooks/useToken";
import {useAuth} from "../../../hooks/useAuth";
import {Response} from "../../../Types";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import {variables} from "../../../utls/variables";


const SignUp = () => {

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

	const register = async (formData) => {

		try {

			const response = await axios(`http://127.0.0.1:8000/api/register/`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				data: formData as FormData
			})

			if (response.status == 200) {
				login(formData)
			}
		} catch (error) {
			console.log(error)
			errorMessage()
		}

	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData:FormData = new FormData(e.target as HTMLFormElement)

		await register(formData)
	}

	return (
		<div className="auth-container">

			<div className="header">

				<div className="text">
					Регистрация
				</div>

			</div>

			<form className="inputs" onSubmit={handleSubmit}>

				<div className="input">
					<FaUser className="icon" />
					<input type="text" placeholder="Имя" name="name" />
				</div>

				<div className="input">
					<GrMail className="icon" />
					<input type="email" placeholder="Почта" name="email" />
				</div>

				<div className="input">
					<FaLock className="icon" />
					<input type="password"  placeholder="Пароль" name="password" />
				</div>


				<div className="sign-in-link-container">
					<Link to="/auth/login" style={{ textDecoration: 'none' }}>
						<span>Уже есть аккаут?</span>
					</Link>
				</div>

				<CustomButton bg={variables.primary} text="Зарегестрироваться" />

			</form>

		</div>
	)
}

export default SignUp;