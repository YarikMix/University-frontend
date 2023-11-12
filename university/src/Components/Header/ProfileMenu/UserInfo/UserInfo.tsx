import "./UserInfo.sass"
import {useAuth} from "/src/hooks/useAuth";
import {ImExit} from "react-icons/im";
import user_avatar from "./user.png";
import {useNavigate } from "react-router-dom";
import {logOutMessage} from "../../../../Toasts/Toasts";
import {useToken} from "../../../../hooks/useToken";
import {useDraftLesson} from "../../../../hooks/useDraftLesson";
import {useModal} from "../../../../hooks/useModal";

const UserInfo = () => {

	const navigate = useNavigate()

	const {is_moderator, user_name, user_email, logOut} = useAuth()

	const {resetTokens} = useToken()

	const {lesson} = useDraftLesson()

	const {modalRef, buttonRef, isOpen, setIsOpen} = useModal()


	const deleteLastLesson = async () => {
		console.log(lesson)
	}

	const doLogOut = () => {

		// TODO
		deleteLastLesson()

		logOut()
		resetTokens()
		logOutMessage()
		navigate("/home")
	}

	return (
		<div>
			<div ref={buttonRef}>
				<img src={user_avatar} className="user-avatar" onClick={(e) => setIsOpen(!isOpen)} />
			</div>

			<div className={"user-info-wrapper " + (isOpen ? "open" : "")} ref={modalRef}>
				<span>Имя: {user_name}</span>
				<span>Почта: {user_email}</span>
				<span>Статус: {is_moderator ? "Модератор" : "Пользователь"}</span>

				<button onClick={doLogOut}>
					Выйти
					<ImExit />
				</button>
			</div>

		</div>
	)
}

export default UserInfo;