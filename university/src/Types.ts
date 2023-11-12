import {ReactElement, ReactEventHandler} from "react";
import {AxiosResponse} from "axios";

export interface Faculty {
    id: number,
    name: string
}

export const iFacultyMock = {
    faculty_id: 0,
    name: "ИУ"
}

export interface Group {
    id: number,
    name: string,
    faculty: Faculty,
    status: number,
    course: number,
    education_type: number,
    year_begin: number,
    year_end: number
}

export interface Lesson {
    id: number,
    status: number,
    discipline: string,
    audience: string,
    teacher: string,
    groups: Group[],
    time: number,
    day_of_week: number,
    date_created: string,
    date_of_formation: string,
    date_complete: string
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

export interface User {
    id: number,
    name: string,
    email: string
}

export type Response = Promise<AxiosResponse> | any