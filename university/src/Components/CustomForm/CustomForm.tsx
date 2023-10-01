import * as React from 'react'
import {Dispatch, useContext, useEffect, useRef, useState} from "react";
import {GroupIdContext, LessonContext} from "../GroupPage/GroupPage";
import "./CustomForm.sass"
import FormInput from "./FormInput/FormInput";
import {Lesson} from "../../Types";
import {FaCalendar, FaRegStickyNote} from "react-icons/fa";
import moment from "moment/moment";
import {MdOutlineWorkHistory} from "react-icons/md";
import {AiFillCheckCircle, AiFillDelete} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import {BACKGROUNDS, DAYS, LESSON_TIME, STATUSES} from "../../Consts";

const CustomForm = ({setIsModalOpen}:{setIsModalOpen:Dispatch<boolean>}) => {

    const { selectedLesson, setSelectedLesson } = useContext(LessonContext)

    const group_id = useContext(GroupIdContext)

    const [values, setValues] = useState<Lesson>({
        id: -1,
        status: 1,
        discipline: "",
        audience: "",
        teacher: "",
        time: 1,
        day_of_week: 1
    })

    const disciplineRef = useRef<HTMLInputElement>(null)
    const teacherRef = useRef<HTMLInputElement>(null)
    const audienceRef = useRef<HTMLInputElement>(null)

    useEffect(() =>{
        setValues({
            id: selectedLesson == null ? -1 : selectedLesson.id,
            status: selectedLesson == null ? 1 : selectedLesson.status,
            time: selectedLesson == null ? 1 : selectedLesson.time,
            day_of_week: selectedLesson == null ? 1 : selectedLesson.day_of_week,
            discipline: selectedLesson == null ? "" : selectedLesson.discipline,
            teacher:  selectedLesson == null? "" : selectedLesson.teacher,
            audience: selectedLesson == null? "" : selectedLesson.audience
        })

    }, [selectedLesson])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)

        if (selectedLesson?.id !== -1){
            fetch(`http://127.0.0.1:8000/api/lessons/${selectedLesson?.id}/update/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(Object.fromEntries(data)),
            })
                .then(response => {
                    if (response.ok)
                        return response.json()

                    throw new Error(response.statusText);
                })
                .then((results) => setSelectedLesson(results))
                .catch((error) => {
                    console.log(error)
                })
        } else {

            fetch(`http://127.0.0.1:8000/api/groups/${group_id}/create_lesson/`, {
                method: "POST"
            })
                .then(response => {
                    if (response.ok)
                        return response.json()

                    throw new Error(response.statusText);
                })
                .then((results:Lesson[]) => {
                    const lesson_id = results[results.length - 1].id

                    fetch(`http://127.0.0.1:8000/api/lessons/${lesson_id}/update/`, {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        body: JSON.stringify(Object.fromEntries(data)),
                    })
                        .then(response => response.json())
                        .then((updated_lesson: Lesson) => {
                            setSelectedLesson(updated_lesson)
                        })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }


    const statusIcons : Record<number, React.ReactElement> = {
        1: <FaRegStickyNote className={"status-icon"} />,
        2: <MdOutlineWorkHistory className={"status-icon"} />,
        3: <AiFillCheckCircle className={"status-icon"} />,
        4: <ImCancelCircle className={"status-icon"} />,
        5: <AiFillDelete className={"status-icon"} />,
    }


    const lessonTime = `${DAYS[values.day_of_week]}  ${LESSON_TIME[values.time]}-${moment(LESSON_TIME[values.time], 'h:mm a').add(95, 'minutes').format("HH:mm")}`

    return (

            <form className={"form-wrapper"} onSubmit={(e) => {handleSubmit(e); setIsModalOpen(false)}}>

                <div className={"top"}>
                    <h3>Редактор занятия</h3>
                </div>

                <div className={"inputs-wrapper"}>
                    <input name={"id"} type="hidden" value={values.id}/>
                    <input name={"status"} type="hidden" value={values.status}/>
                    <input name={"time"} type="hidden" value={values.time}/>
                    <input name={"day_of_week"} type="hidden" value={values.day_of_week}/>

                    <div className={"form-input-wrapper"}>
                        <label>Время</label>
                        <div className={"form-input-container " + BACKGROUNDS[values.status]}>
                            <input className={"lesson-time-input"} disabled={true} type="text" value={lessonTime} />
                            <FaCalendar className={"lesson-time-icon"} />
                        </div>
                    </div>

                    <div className={"form-input-wrapper"}>
                        <label>Статус</label>
                        <div className={"form-input-container " + BACKGROUNDS[values.status]}>
                            <input className={BACKGROUNDS[values.status]} disabled={true} type="text" value={STATUSES[values.status]} placeholder="Статус" />
                            {statusIcons[values.status]}
                        </div>
                    </div>

                    <FormInput name={"discipline"} placeholder={"Дисциплина"} value={values.discipline} refer={disciplineRef} onChange={onChange}/>
                    <FormInput name={"teacher"} placeholder={"Преподаватель"} value={values.teacher} refer={teacherRef} onChange={onChange}/>
                    <FormInput name={"audience"} placeholder={"Аудитория"} value={values.audience} refer={audienceRef} onChange={onChange}/>
                </div>

                <div className={"buttons-container"}>
                    <button className={"save-button"}>Сохранить</button>
                </div>

            </form>


    )
}

export default CustomForm;