import "./GroupInfo.sass"
import FacultyIcon from "/src/Components/FacultyIcon/FacultyIcon";
import {useEffect} from "react";
import {Response} from "/src/Types";
import {COURSES, EDUCATION_TYPES, DOMEN, requestTime} from "/src/Consts";
import {useGroup} from "/src/hooks/useGroup";
import axios from "axios";

const GroupInfo = ({ group_id }: { group_id:number | undefined }) => {

    const { group, setGroup } = useGroup()

    const fetchData = async () => {
        try {
            const response:Response = await axios(`${DOMEN}/api/groups/${group_id}`, {
                method: "GET"
            });

            if (response.status == 200){
                setGroup(response.data)
            }

            setGroup(response.data)

        } catch (e) {

        }

    };


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

            <FacultyIcon className="faculty-image" faculty={group.faculty}/>

            <div className="group-info-details">
                <h3>Группа {group.name}</h3>
                <span>Факультет: {group.faculty.name}</span>
                <span>Курс: {COURSES.find(course => course.id == group?.course)?.name}</span>
                <span>Вариант обучения: {EDUCATION_TYPES.find(education_type => education_type.id == group?.education_type)?.name}</span>
                <span>Год начала обучения: {group.year_begin}</span>
                <span>Год конца обучения: {group.year_end}</span>
            </div>
        </div>
    )
}

export default  GroupInfo;