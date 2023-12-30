import * as React from 'react'
import "./LessonSchecule.sass";
import {useDraftLesson} from "/src/hooks/useDraftLesson";
import {BsFillCheckCircleFill} from "react-icons/bs";

const LessonSchedule = ({ day, time }) => {

    const { lesson, setDay, setTime } = useDraftLesson()

    const onChooseTime = async (e) => {

        e.target.classList.add("animate")

        setTimeout(() => {
            e.target.classList.remove("animate")
        }, 600)

        setDay(day.id)
        setTime(time.id)
    }

    const isSelected = lesson.day_of_week == day.id && lesson.time == time.id

    return (
        <div className="lesson" onClick={onChooseTime}>
            {isSelected && <BsFillCheckCircleFill />}
        </div>
    )
}

export default LessonSchedule;