import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.sass"
import {FaHome, FaChevronRight} from "react-icons/fa";
import {useGroup} from "../../hooks/useGroup";

const Breadcrumbs = () => {

    const { group, setGroup } = useGroup()

    const resetSelectedGroup = () => setGroup(undefined)

    const location = useLocation()

    let currentLink = ''

    let topics = {
        "groups": "Группы",
        "draft": "Черновик",
        "lessons": "Занятия",
        "home": "Главная",
        "profile": "Профиль",
        "login": "Вход",
        "register": "Регистрация"
    }

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedGroup}>
                        { topics[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('groups/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Группа { group?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs">

            <div className="crumb">

                <Link to={"/"}>
                    <FaHome className={"home-icon"}/>
                </Link>

                <FaChevronRight className={"chevron-icon"} />

            </div>

            {crumbs}

        </div>
    )
}

export default Breadcrumbs;