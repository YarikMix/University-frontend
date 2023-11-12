// export const DOMEN = "https://cors-anywhere.herokuapp.com/http://smoll.net:8000"
import {Faculty, Option} from "./Types";

export const DOMEN = "http://127.0.0.1:8000/"

export const requestTime = 1000

export const COURSES: Option[] = [
    {
        id: -1,
        name: "Любой"
    },
    {
        id: 1,
        name: "Первый"
    },
    {
        id: 2,
        name: "Второй"
    },
    {
        id: 3,
        name: "Третий"
    },
    {
        id: 4,
        name: "Четвертый"
    },
]

export const EDUCATION_TYPES: Option[] = [
    {
        id: -1,
        name: "Любой"
    },
    {
        id: 1,
        name: "Бакалавриат"
    },
    {
        id: 2,
        name: "Специалитет"
    },
    {
        id: 3,
        name: "Магистратура"
    },
]

export const iFacultiesMock = [
    {
        faculty_id: 1,
        name: "ИУ"
    },
    {
        faculty_id: 2,
        name: "СМ"
    },
    {
        faculty_id: 3,
        name: "РК"
    },
    {
        faculty_id: 4,
        name: "ИБМ"
    },
    {
        faculty_id: 5,
        name: "МТ"
    }
]

export const iFacultiesOptionsMock = [
    {
        id: 1,
        name: "ИУ"
    },
    {
        id: 2,
        name: "СМ"
    },
    {
        id: 3,
        name: "РК"
    },
    {
        id: 4,
        name: "ИБМ"
    },
    {
        id: 5,
        name: "МТ"
    }
]




export const iGroupsMock = [
    {
        id: 1,
        name: "ИУ1-22",
        faculty: 1,
        status: 1,
        course: 2,
        education_type: 1,
        year_begin: 2018,
        year_end: 2022
    },
    {
        id: 2,
        name: "СМ5-45",
        faculty: 2,
        status: 1,
        course: 2,
        education_type: 2,
        year_begin: 2021,
        year_end: 2027
    },
    {
        id: 3,
        name: "РК6-12",
        faculty: 3,
        status: 1,
        course: 1,
        education_type: 1,
        year_begin: 2023,
        year_end: 2027
    },
    {
        id: 4,
        name: "ИБМ4-73",
        faculty: 4,
        status: 1,
        course: 4,
        education_type: 1,
        year_begin: 2019,
        year_end: 2023
    },
    {
        id: 5,
        name: "ИУ10-45",
        faculty: 1,
        status: 1,
        course: 2,
        education_type: 1,
        year_begin: 2021,
        year_end: 2025
    },
    {
        id: 6,
        name: "МТ2-51",
        faculty: 5,
        status: 1,
        course: 3,
        education_type: 2,
        year_begin: 2022,
        year_end: 2028
    },
]

export const LESSON_TIME : Option[] = [
    {
        id: 1,
        name: "8:30-10:05"
    },
    {
        id: 2,
        name: "10:15-11:50"
    },
    {
        id: 3,
        name: "12:00-13:35"
    },
    {
        id: 4,
        name: "13:50-15:25"
    },
    {
        id: 5,
        name: "15:40-17:15"
    },
    {
        id: 6,
        name: "17:25-19:00"
    },
    {
        id: 7,
        name: "19:10-20:45"
    }
]

export const LESSON_DAY = [
    {
        id: 1,
        full_name: "Понедельник",
        name: "Пн"
    },
    {
        id: 2,
        full_name: "Вторник",
        name: "Вт"
    },
    {
        id: 3,
        full_name: "Среда",
        name: "Ср"
    },
    {
        id: 4,
        full_name: "Четверг",
        name: "Чт"
    },
    {
        id: 5,
        full_name: "Пятница",
        name: "Пт"
    },
    {
        id: 6,
        full_name: "Суббота",
        name: "Сб"
    }
]

/*
export const LESSON_TIME = [
    "8:30-10:05",
    "10:15-11:50",
    "12:00-13:35",
    "13:50-15:25",
    "15:40-17:15",
    "17:25-19:00",
    "19:10-20:45"
]

export const LESSON_DAY = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
]
*/

export const STATUSES : Option[] = [
    {
        id: 1,
        name: "Черновик"
    },
    {
        id: 2,
        name: "В работе"
    },
    {
        id: 3,
        name: "Завершен"
    },
    {
        id: 4,
        name: "Отменен"
    },
    {
        id: 5,
        name: "Удален"
    }
]


export const BACKGROUNDS: Record<number, string> = {
    1: "#FF66CC",
    2: "#3366CC",
    3: "#00FF66",
    4: "#FF9966",
    5: "#CC3333"
}

export const iLessonDraft = {
    id: -1,
    status: 1,
    discipline: "",
    audience: "",
    teacher: "",
    groups: [],
    time: 1,
    day_of_week: 1
}

export const FacultyItemAny:Faculty = {
    id: -1,
    name: "Любой"
}