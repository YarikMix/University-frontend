import "./UserInfo.sass"
import {useEffect, useRef, useState} from "react";
import {useAuth} from "/src/hooks/useAuth";
import {ImExit} from "react-icons/im";
import user_avatar from "./user.png";
import {useNavigate } from "react-router-dom";
import {logOutMessage} from "../../../../Toasts/Toasts";
import {useToken} from "../../../../hooks/useToken";

const UserInfo = () => {

	const navigate = useNavigate()

	const {is_moderator, user_name, user_email, logOut} = useAuth()

	const {resetToken} = useToken()

	const [open, setOpen] = useState<boolean>(false)


	const ref1 = useRef(null);

	const ref2 = useRef(null);

	const handleClickOutside = (event) => {
		if (ref1.current && !ref1.current.contains(event.target) && !ref2.current.contains(event.target)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);


	const doLogOut = () => {
		logOut()
		resetToken()
		logOutMessage()
		navigate("/home")
	}

	return (
		<div>
			<img src={user_avatar} className="user-avatar"  onClick={(e) => setOpen(!open)} ref={ref2}/>

			<div className={"user-info-wrapper " + (open ? "open" : "")} ref={ref1}>
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