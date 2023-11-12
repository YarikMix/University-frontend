import * as React from 'react'
import LessonSchedule from "./LessonSchedule/LessonSchedule";
import {LESSON_DAY} from "/src/Consts";
import {useDesktop} from "../../../../hooks/useDesktop";

const WeekSchedule = ({time}) => {

    const {isMobile} = useDesktop()

    const lessons = LESSON_DAY.map(day => (
        <LessonSchedule day={day} time={time} key={day.id} />
    ))

    return (
        <div className="week">

            {!isMobile && <div className="time">
                <span>{time.name}</span>
            </div>}


            <div className={"lessons"}>

                {lessons}

            </div>
        </div>
    )

}

export default WeekSchedule;