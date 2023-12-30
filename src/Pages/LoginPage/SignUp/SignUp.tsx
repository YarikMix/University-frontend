import "../Login.sass"
import {FaLock, FaUser} from "react-icons/fa6";
import {GrMail} from "react-icons/gr";
import {Link, useNavigate} from "react-router-dom";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import {variables} from "../../../utls/variables";
import {useAuth} from "../../../hooks/useAuth";
import {useEffect} from "react";


const SignUp = () => {

	const navigate = useNavigate()

	const { register, auth } = useAuth()


	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData:FormData = new FormData(e.target as HTMLFormElement)

		const flag = await register(formData)

		if (flag) {

			navigate("/auth/login")

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
					Регистрация
				</div>

			</div>

			<form className="inputs" onSubmit={handleSubmit}>

				<div className="input">
					<FaUser className="icon" />
					<input type="text" placeholder="Имя" name="name" required/>
				</div>

				<div className="input">
					<GrMail className="icon" />
					<input type="email" placeholder="Почта" name="email" required/>
				</div>

				<div className="input">
					<FaLock className="icon" />
					<input type="password"  placeholder="Пароль" name="password" required/>
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