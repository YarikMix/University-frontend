import "./GroupInfo.sass"
import FacultyIcon from "../../FacultyIcon/FacultyIcon";
import {Dispatch, useEffect, useState} from "react";
import {Faculty, Group, iFacultyMock} from "../../../Types";
import logo from "./Logo.png"
import {COURSES, EDUCATION_TYPES, DOMEN, iFacultiesMock, iGroupsMock, requestTime} from "../../../Consts";

const GroupInfo = ({ group_id, selectedGroup, setSelectedGroup }:{ group_id:number | undefined, selectedGroup:Group| undefined, setSelectedGroup:Dispatch<Group | undefined> }) => {

    const [faculty, setFaculty] = useState<Faculty>();

    const [isMock, setIsMock] = useState<boolean>(true);

    const fetchData = async () => {

        try {
            const response1 = await fetch(`${DOMEN}/api/groups/${group_id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response1.ok){
                MockGroupInfo()
            }

            const group: Group = await response1.json()

            setSelectedGroup(group)
            setIsMock(false)

            const response2 = await fetch(`${DOMEN}/api/facults/${group.faculty}/`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response2.ok){
                MockFacultyInfo()
                return;
            }

            const faculty: Faculty = await response2.json()

            setFaculty(faculty)

        } catch (e) {

            MockGroupInfo()
            MockFacultyInfo()

        }

    };

    const MockGroupInfo = () => {
        setSelectedGroup(iGroupsMock.find((group:Group) => group.id == group_id))
        setIsMock(true)
    }

    const MockFacultyInfo = () => {

        setFaculty(iFacultyMock)

    }

    useEffect(() => {
        fetchData()
    }, [])


    if (!selectedGroup){
        return (
            <div>

            </div>
        )
    }

    if (isMock){

        return (
            <div className={"group-info-wrapper"}>
                <img className="faculty-image" src={logo} />
                <div className="group-info-details">
                    <h3>Группа {selectedGroup.name}</h3>
                    <span>Факультет: {iFacultiesMock.find(faculty => faculty.id == selectedGroup?.faculty)?.name}</span>
                    <span>Курс: {COURSES.find(course => course.id == selectedGroup?.course)?.name}</span>
                    <span>Вариант обучения: {EDUCATION_TYPES.find(education_type => education_type.id == selectedGroup?.education_type)?.name}</span>
                    <span>Год начала обучения: {selectedGroup.year_begin}</span>
                    <span>Год конца обучения: {selectedGroup.year_end}</span>
                </div>
            </div>
        )
    }

    return (
        <div className={"group-info-wrapper"}>
            <FacultyIcon faculty_id={selectedGroup.faculty} />
            <div className="group-info-details">
                <h3>Группа {selectedGroup.name}</h3>
                <span>Факультет: {faculty?.name}</span>
                <span>Курс: {COURSES[selectedGroup.course].name}</span>
                <span>Вариант обучения: {EDUCATION_TYPES[selectedGroup.education_type].name}</span>
                <span>Год начала обучения: {selectedGroup.year_begin}</span>
                <span>Год конца обучения: {selectedGroup.year_end}</span>
            </div>
        </div>
    )
}

export default  GroupInfo;