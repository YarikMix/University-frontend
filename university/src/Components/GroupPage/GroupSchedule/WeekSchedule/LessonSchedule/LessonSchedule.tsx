import * as React from 'react'
import {useContext, useEffect, useState} from "react";
import {Lesson} from "../../../../../Types";
import {FaRegStickyNote} from "react-icons/fa";
import "./LessonSchecule.sass";
import {MdOutlineWorkHistory} from "react-icons/md";
import {AiFillCheckCircle, AiFillDelete} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import {IoIosAddCircleOutline} from "react-icons/io";
import {LessonContext, ModalContext} from '../../../GroupPage';
import {LessonsContext, TimeContext} from "../../GroupSchedule";

const LessonSchedule = ({ day_id } : { day_id: number }) => {
    const [lesson, setLesson] = useState<Lesson | undefined>()


    const { setIsModalOpen } = React.useContext(ModalContext)
    const { lessons } = React.useContext(LessonsContext)
    const time_id = useContext(TimeContext)
    const { selectedLesson, setSelectedLesson } = useContext(LessonContext)

    useEffect(() => {

        setLesson(Object.values(lessons).find(lesson => lesson.time === time_id && lesson.day_of_week === day_id))

    }, [lessons])

    useEffect(() => {

        if (lesson == undefined && selectedLesson != undefined && selectedLesson.id != -1 && selectedLesson.day_of_week === day_id && selectedLesson.time === time_id){
            setLesson(selectedLesson)
        }

        if (selectedLesson != undefined && lesson != undefined && selectedLesson.day_of_week === lesson.day_of_week && selectedLesson.time === lesson.time){
            setLesson(selectedLesson)
        }

    }, [selectedLesson])



    const [isDesktop, setDesktop] = useState(window.innerWidth > 660);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 660);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


    if (lesson == undefined) {
        return (
            <div className="lesson" onClick={() => {
                setSelectedLesson({
                    id: -1,
                    status: 1,
                    discipline: "",
                    audience: "",
                    teacher: "",
                    time: time_id,
                    day_of_week: day_id
                })
                setIsModalOpen(true)
            }}>
                <div className={"dialog-container"}>
                    <IoIosAddCircleOutline className={"add-icon"}/>
                    {isDesktop && <span>Добавить занятие</span> }
                </div>
            </div>
        )
    }

    const statusIcons : Record<number, React.ReactElement> = {
        1: <FaRegStickyNote className={"status-icon"} />,
        2: <MdOutlineWorkHistory className={"status-icon"} />,
        3: <AiFillCheckCircle className={"status-icon"} />,
        4: <ImCancelCircle className={"status-icon"} />,
        5: <AiFillDelete className={"status-icon"} />,
    }

    const backgrounds : Record<number, string> = {
        1: "injected",
        2: "atwork",
        3: "completed",
        4: "cancelled",
        5: "deleted",
    }

    return (
        <div className={"lesson " + backgrounds[lesson.status]} onClick={() => {
            setSelectedLesson(lesson)
            setIsModalOpen(true)
        }}>

            <div className="top-container">
                {statusIcons[lesson.status]}
            </div>

            <div className="center-container">
                <span className={"discipline"}>{lesson.discipline}</span>
            </div>

            <div className="bottom-container">
                <span className={"audience"}>{lesson.audience}</span>
            </div>

        </div>
    )
}

export default LessonSchedule;