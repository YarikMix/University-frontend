export interface Faculty {
    faculty_id: number,
    name: string
}

export const iFacultyMock = {
    faculty_id: 0,
    name: "ИУ"
}

export interface Group {
    id: number,
    name: string,
    faculty: number,
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
    time: number,
    day_of_week: number
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