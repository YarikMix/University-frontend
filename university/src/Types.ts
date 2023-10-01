import * as React from "react";

export interface Faculty {
    faculty_id: number,
    name: string
}

export interface Group {
    id: number,
    name: string,
    faculty: number,
    status: string,
    course: number,
    education_type: number,
    year_begin: number,
    year_end: number
}

export const iGroupMock = {
    id: -1,
    name: "ИУ10-120",
    faculty: -2,
    status: "Enabled",
    course: 1,
    education_type: 1,
    year_begin: 2023,
    year_end: 2027
}

export type GroupsContextType = {
    groups: Group[],
    setGroups: React.Dispatch<React.SetStateAction<Group[] | []>>
}

export const iGroupsContextState = {
    groups: [],
    setGroups: () => {}
}

export type SelectedGroupContextType = {
    selectedGroup: Group | null,
    setSelectedGroup: React.Dispatch<React.SetStateAction<Group | null>>
}

export const iSelectedGroupContextState = {
    selectedGroup: null,
    setSelectedGroup: () => {}
}

export interface Lesson {
    id: number,
    status: number,
    discipline: string,
    audience: string,
    teacher: string,
    time: number,
    day_of_week: number
}

export type LessonsContextType = {
    lessons: Lesson[],
    setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>
}

export const iLessonsContextState = {
    lessons: [],
    setLessons: () => {}
}


export type SelectedLessonContextType = {
    selectedLesson: Lesson | undefined,
    setSelectedLesson: React.Dispatch<React.SetStateAction<Lesson | undefined>>
}

export const iSelectedLessonContextState = {
    selectedLesson: undefined,
    setSelectedLesson: () => {}
}

export interface Option {
    id: number,
    name: string
}

export interface DropdownMenuList {
    options: Option[],
    defaultTitle: string,
    appendDefaultTitle: boolean,
    setSelectedOption: (id: number) => void
}


export type ModalContextType = {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const iModalContextState = {
    isModalOpen: false,
    setIsModalOpen: () => {}
}

