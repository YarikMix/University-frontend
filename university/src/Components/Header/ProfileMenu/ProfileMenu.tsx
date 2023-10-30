import "./ProfileMenu.sass"
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";
import {Link} from "react-router-dom";
import axios from "axios";
import UserInfo from "./UserInfo/UserInfo";
import {useAuth} from "/src/hooks/useAuth";
import {useToken} from "/src/hooks/useToken";
import {useDesktop} from "/src/hooks/useDesktop";
import {Response} from "../../../Types";

const ProfileMenu = () => {

    const {token} = useToken()

    const {is_authenticated, user_name, setUser} = useAuth()

    const {isDesktop} = useDesktop();

    const auth = async () => {

        try {

            const response: Response = await axios(`http://localhost:8000/api/check/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': `${token}`
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
            }

        } catch (error) {
            if (error.response.status == 401)
            {
                // TODO
            }
        }

    }

    useEffect(() => {

        if (!is_authenticated)
        {
            if (token)
            {
                auth()
            }
        }

    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false)

    if (is_authenticated)
    {
        return (
            <div className={"profile-menu-wrapper"}>

                <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                    <div className="menu-item">
                        <Link to="/home" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                            <span className="item">Главная</span>
                        </Link>
                    </div>


                    <div className="menu-item">
                        <Link to="/groups" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                            <span className="item">Группы</span>
                        </Link>
                    </div>


                    <div className="menu-item">
                        <Link to="/lessons" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                            <span className="item">Занятия</span>
                        </Link>
                    </div>

                    { !isDesktop &&  <div className="menu-item">
                        <Link to="/profile" style={{ textDecoration: 'none' }} onClick={(e) => setIsOpen(false)}>
                            <span className="item">{user_name}</span>
                        </Link>
                    </div>}

                    { isDesktop && <UserInfo />}

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