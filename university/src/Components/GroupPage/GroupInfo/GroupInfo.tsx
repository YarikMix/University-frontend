import * as React from 'react'
import "./GroupInfo.sass"
import FacultyIcon from "../../FacultyIcon/FacultyIcon";
import {useContext, useEffect, useState} from "react";
import {Faculty, Group, iGroupMock} from "../../../Types";
import {GroupIdContext} from "../GroupPage";
import {GroupContext} from "../../../App";
import logo from "./Logo.png"
import {COURSES, EDUCATION_TYPES} from "../../../Consts";

const GroupInfo = () => {
    const [groupInfo, setGroupInfo] = useState<Group>();

    const [faculty, setFaculty] = useState<Faculty>();

    const group_id = useContext(GroupIdContext)

    const { setSelectedGroup } = useContext(GroupContext)

    const fetchData = () => {
        fetch("http://127.0.0.1:8000/api/groups/" + group_id)
            .then(response => {
                if (response.ok)
                    return response.json()

                throw new Error('Something went wrong');
            })
            .then((results:Group) => {
                setGroupInfo(results)
                setSelectedGroup(results)

                fetch("http://127.0.0.1:8000/api/facults/" + results.faculty)
                    .then((response) => response.json())
                    .then((results) => setFaculty(results))
            })
            .catch((error) => {
                const mockGroup:Group = iGroupMock
                setGroupInfo(mockGroup)
                setSelectedGroup(mockGroup)
            });
    };

    useEffect(() => {
        fetchData()
    }, [])


    if (!groupInfo){
        return (
            <div>

            </div>
        )
    }

    if (group_id == "-1"){
        return (
            <div className={"group-info-wrapper"}>
                <img className="faculty-image" src={logo} />
                <div className="group-info-details">
                    <h3>Группа ИУ10-120</h3>
                    <span>Факультет: ИУ</span>
                    <span>Курс: Третий</span>
                    <span>Вариант обучения: Бакалавриат</span>
                    <span>Год начала обучения: 2023</span>
                    <span>Год конца обучения: 2027</span>
                </div>
            </div>
        )
    }

    return (
        <div className={"group-info-wrapper"}>
            <FacultyIcon faculty_id={groupInfo.faculty} />
            <div className="group-info-details">
                <h3>Группа {groupInfo.name}</h3>
                <span>Факультет: {faculty?.name}</span>
                <span>Курс: {COURSES[groupInfo.course].name}</span>
                <span>Вариант обучения: {EDUCATION_TYPES[groupInfo.education_type].name}</span>
                <span>Год начала обучения: {groupInfo.year_begin}</span>
                <span>Год конца обучения: {groupInfo.year_end}</span>
            </div>
        </div>
    )
}

export default  GroupInfo;