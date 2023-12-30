import "./ProfileMenu.sass"
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";
import {Link} from "react-router-dom";
import UserInfo from "./UserInfo/UserInfo";
import {useAuth} from "/src/hooks/useAuth";
import {useDesktop} from "/src/hooks/useDesktop";

const ProfileMenu = () => {

    const {is_authenticated, user_name, auth} = useAuth()

    const {isDesktopMedium} = useDesktop();


    useEffect(() => {

        auth()

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