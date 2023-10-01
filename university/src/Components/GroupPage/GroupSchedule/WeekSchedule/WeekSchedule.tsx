import * as React from 'react'
import moment from "moment";
import LessonSchedule from "./LessonSchedule/LessonSchedule";
import {useContext} from "react";
import {TimeContext} from "../GroupSchedule";
import {LESSON_TIME} from "../../../../Consts";

const WeekSchedule = () => {

    const time_id = useContext(TimeContext)

    const lessons = ([1, 2, 3, 4, 5, 6]).map(day_id => {
        return (
            <LessonSchedule day_id={day_id} key={day_id}  />
        )
    })

    return (
        <div className="week">
            <div className="time">
                <span>{LESSON_TIME[time_id]} - {moment(LESSON_TIME[time_id], 'h:mm a').add(95, 'minutes').format("HH:mm")}</span>
            </div>

            <div className={"lessons"}>

                { lessons }

            </div>
        </div>
    )

}

export default WeekSchedule;