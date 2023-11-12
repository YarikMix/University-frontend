import "./ProfileMenu.sass"
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";
import {Link} from "react-router-dom";
import axios from "axios";
import UserInfo from "./UserInfo/UserInfo";
import {useAuth} from "/src/hooks/useAuth";
import {useToken} from "/src/hooks/useToken";
import {useDesktop} from "/src/hooks/useDesktop";
import {Response} from "/src/Types";
import {useDraftLesson} from "../../../hooks/useDraftLesson";

const ProfileMenu = () => {

    const {access_token, refresh_token} = useToken()

    const {is_authenticated, user_name, setUser} = useAuth()

    const {isDesktopMedium} = useDesktop();

    const {setLesson} = useDraftLesson()

    const fetchLesson = async () => {
        try {

            const response: Response = await axios(`http://localhost:8000/api/lessons/draft/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': access_token
                },
            })

            if (response.status != 404)
            {
                setLesson(response.data)
            }

        } catch (error) {


        }
    }

    const auth = async () => {

        try {

            const response: Response = await axios(`http://localhost:8000/api/check/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': access_token
                },
            })

            if (response.status == 200)
            {
                const permissions = {
                    is_authenticated: true,
                    is_moderator: response.data["is_moderator"],
                    user_id: response.data["user_id"],
                    user_name: response.data["name"],
                    user_email: response.data["email"],
                }

                setUser(permissions)
                await fetchLesson()
            }

        } catch (error) {

            if (error.response.status == 401)
            {
                // await refreshToken()
            }
        }

    }

    const refreshToken = async () => {
        try {

            console.log("refresh")

            const response: Response = await axios(`http://localhost:8000/api/refresh/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': `${refresh_token}`
                },
            })

            console.log(response.status)
            console.log(response.data)

            if (response.status == 201)
            {
                const permissions = {
                    is_authenticated: true,
                    is_moderator: response.data["is_moderator"],
                    user_id: response.data["user_id"],
                    user_name: response.data["name"],
                    user_email: response.data["email"],
                }

                setUser(permissions)
            }
        } catch (e)
        {
            console.log(e.status)
        }
    }

    useEffect(() => {

        if (!is_authenticated)
        {
            auth()
        }

    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false)

    if (is_authenticated)
    {
        return (
            <div className={"profile-menu-wrapper"}>

                <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                    <Link to="/home" className="menu-item" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                        <span className="item">Главная</span>
                    </Link>

                    <Link to="/groups" className="menu-item" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                        <span className="item">Группы</span>
                    </Link>

                    <Link to="/lessons" className="menu-item" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                        <span className="item">Занятия</span>
                    </Link>

                    { !isDesktopMedium &&
                        <Link to="/profile" className="menu-item" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                            <span className="item">{user_name}</span>
                        </Link>
                    }

                    { isDesktopMedium && <UserInfo />}

                </div>

                <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

            </div>
        )
    }

    return (
        <div className={"profile-menu-wrapper"}>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/home" className="menu-item" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                    <span className="item">Главная</span>
                </Link>

                <Link to="/groups" className="menu-item" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                    <span className="item">Группы</span>
                </Link>

                <Link to="/auth" className="menu-item" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                    <span className="item">Вход</span>
                </Link>

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>

    )
}

export default ProfileMenu;