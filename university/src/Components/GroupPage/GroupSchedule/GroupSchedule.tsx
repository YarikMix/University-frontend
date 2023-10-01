import * as React from 'react'
import "./GroupSchedule.sass"
import WeekSchedule from "./WeekSchedule/WeekSchedule";
import {useContext, useEffect, useRef, useState} from "react";
import {iLessonsContextState, Lesson, LessonsContextType} from "../../../Types";
import {GroupIdContext} from "../GroupPage";
import Modal from "../../Modal/Modal";

export const LessonsContext = React.createContext<LessonsContextType>(iLessonsContextState);

export const TimeContext = React.createContext<number>(-1);

const GroupSchedule = () => {

    const [lessons, setLessons] = useState<Lesson[]>([])

    const group_id = useContext(GroupIdContext)

    const fetchData = () => {
        fetch(`http://127.0.0.1:8000/api/groups/${group_id}/lessons/`)
            .then(response => {
                if (response.ok)
                    return response.json()

                throw new Error('Something went wrong');
            })
            .then((results) => setLessons(results))
            .catch((error) => {
                setLessons([])
            });
    };

    useEffect(() => {
        fetchData()
    }, [])


    const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 768);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });



    if (lessons == undefined){
        return (
            <div>

            </div>
        )
    }

    const weeks = ([1, 2, 3, 4, 5, 6, 7]).map(time_id => {
        return (
            <TimeContext.Provider value={time_id} key={time_id}>
                <WeekSchedule key={time_id}/>
            </TimeContext.Provider>
        )
    })

    const days1 = (["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]).map(day => {
        return <div className={"day"}>
            <span>{day}</span>
        </div>
    })

    const days2 = (["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]).map(day => {
        return <div className={"day"}>
            <span>{day}</span>
        </div>
    })

    return (

        <LessonsContext.Provider value={{lessons, setLessons}}>

            <Modal/>

            <div className={"group-schedule-wrapper"}>

            <div className="top">
                <h3>Расписание занятий</h3>
            </div>

            <div className="bottom">

                <div className="days-container">

                    <div className={"corner"}></div>

                    <div className={"days"}>

                        {isDesktop ? days1 : days2}

                    </div>

                </div>

                <div className="lessons-container">

                    { weeks }

                </div>


            </div>

        </div>

        </LessonsContext.Provider>
    )
}

export default  GroupSchedule;