import "./GroupInfo.sass"
import FacultyIcon from "../../FacultyIcon/FacultyIcon";
import {useEffect, useState} from "react";
import {Faculty, Group, Response} from "/src/Types";
import {COURSES, EDUCATION_TYPES, DOMEN, iFacultiesMock, iGroupsMock, requestTime} from "/src/Consts";
import {useGroup} from "/src/hooks/useGroup";
import axios from "axios";

const GroupInfo = ({ group_id }: { group_id:number | undefined }) => {

    const [faculty, setFaculty] = useState<Faculty>();

    const [isMock, setIsMock] = useState<boolean>(false);

    const { group, setGroup } = useGroup()


    const fetchData = async () => {
        try {
            const response1:Response = await axios(`${DOMEN}/api/groups/${group_id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (response1.status != 200){
                CreateMocks()
                return;
            }

            setGroup(response1.data)

            const response2:Response = await axios(`${DOMEN}/api/faculties/${response1.data["faculty"]}/`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            setFaculty(response2.data)
            setIsMock(false)

        } catch (e) {

            CreateMocks()

        }

    };

    const CreateMocks = () => {

        const selectedGroup = iGroupsMock.find((group:Group) => group.id == group_id);

        setGroup(selectedGroup)

        setFaculty(iFacultiesMock.find(faculty => faculty.faculty_id == selectedGroup?.faculty))

        setIsMock(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (group == undefined)
    {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className={"group-info-wrapper"}>
            <FacultyIcon className="faculty-image" faculty_id={group.faculty} isMock={isMock}/>
            <div className="group-info-details">
                <h3>Группа {group.name}</h3>
                <span>Факультет: {faculty?.name}</span>
                <span>Курс: {COURSES.find(course => course.id == group?.course)?.name}</span>
                <span>Вариант обучения: {EDUCATION_TYPES.find(education_type => education_type.id == group?.education_type)?.name}</span>
                <span>Год начала обучения: {group.year_begin}</span>
                <span>Год конца обучения: {group.year_end}</span>
            </div>
        </div>
    )
}

export default  GroupInfo;