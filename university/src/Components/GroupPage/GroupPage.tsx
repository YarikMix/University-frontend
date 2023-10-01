import * as React from 'react'
import "./GroupPage.sass"
import GroupSchedule from "./GroupSchedule/GroupSchedule";
import GroupInfo from "./GroupInfo/GroupInfo";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {
    Lesson,
    SelectedLessonContextType,
    iSelectedLessonContextState,
    ModalContextType,
    iModalContextState
} from "../../Types";


export const GroupIdContext = React.createContext<string>("-1");

export const LessonContext = React.createContext<SelectedLessonContextType>(iSelectedLessonContextState)

export const ModalContext = React.createContext<ModalContextType>(iModalContextState)


const GroupPage = () => {
    const { id } = useParams<string>();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>(undefined)

    if (id == undefined){
        return  (
            <div>

            </div>
        )
    }

    return (
        <LessonContext.Provider value={{selectedLesson, setSelectedLesson}}>
            <GroupIdContext.Provider value={id}>
                <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
                    <GroupInfo />
                    <GroupSchedule />
                </ModalContext.Provider>
            </GroupIdContext.Provider>
        </LessonContext.Provider>
    )
}

export default  GroupPage;