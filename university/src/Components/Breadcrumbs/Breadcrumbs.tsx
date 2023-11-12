import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.sass"
import {FaHome, FaChevronRight} from "react-icons/fa";
import {Group} from "../../Types";
import {Dispatch} from "react";

const Breadcrumbs = ({ selectedGroup, setSelectedGroup }: { selectedGroup:Group | undefined, setSelectedGroup: Dispatch<Group | undefined> }) => {
    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (crumb == "groups")
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={() => setSelectedGroup(undefined)}>
                        Группы
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
                        Группа { selectedGroup?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className={"breadcrumbs-wrapper"}>
            <div className={"breadcrumbs"}>

                <div className="crumb">

                    <Link to={"/"}>
                        <FaHome className={"home-icon"}/>
                    </Link>

                    <FaChevronRight className={"chevron-icon"} />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;