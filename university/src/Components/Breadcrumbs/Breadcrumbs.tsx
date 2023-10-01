import * as React from 'react'
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.sass"
import {FaHome, FaChevronRight} from "react-icons/fa";
import {useContext} from "react";
import {GroupContext} from "../../App";

const Breadcrumbs = () => {
    const location = useLocation()

    let currentLink = ''

    const { selectedGroup, setSelectedGroup } = useContext(GroupContext)


    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (crumb == "groups")
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={() => setSelectedGroup(null)}>
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

                    <Link to={currentLink}>
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