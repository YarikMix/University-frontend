import "../Login.sass"
import {FaLock} from "react-icons/fa6";
import {GrMail} from "react-icons/gr";
import {Link, useNavigate } from "react-router-dom";
import {errorMessage, successMessage} from "/src/Toasts/Toasts";
import {useToken} from "/src/hooks/useToken";
import {useAuth} from "../../../hooks/useAuth";
import {variables} from "../../../utls/variables";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import {useEffect} from "react";




const SignIn = () => {

	const navigate = useNavigate()

	const { login, auth } = useAuth()


	const handleSubmit = async (e) => {

		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)

		const flag = await login(formData)

		if (flag) {

			navigate("/home")

		}
	}



	const handleAuth = async () => {
		const flag = await auth()
		if (flag) {
			navigate("/home")
		}
	}

	useEffect(() => {
		handleAuth()
	}, []);



	return (
		<div className="auth-container">

			<div className="header">

				<div className="text">
					Вход
				</div>

			</div>

			<form className="inputs" action="POST" onSubmit={handleSubmit}>

				<div className="input">
					<GrMail />
					<input type="email" name="email" placeholder="Почта" required/>
				</div>

				<div className="input">
					<FaLock />
					<input type="password" name="password"  placeholder="Пароль" required/>
				</div>


				<div className="sign-up-link-container">
					<Link to="/auth/register" style={{ textDecoration: 'none' }}>
						<span> Ещё нет аккаунта? </span>
					</Link>
				</div>

				<CustomButton bg={variables.primary} text="Войти" />

			</form>

		</div>
	)
}

export default SignIn;