export const COURSES = [
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

export const EDUCATION_TYPES = [
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

export const LESSON_TIME : Record<number, string> = {
    1: "8:30",
    2: "10:15",
    3: "12:00",
    4: "13:50",
    5: "15:40",
    6: "17:25",
    7: "19:10",
}


export const DAYS : Record<number, string> = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота"
}

export const STATUSES : Record<number, string> = {
    1: "Введён",
    2: "В работе",
    3: "Завершен",
    4: "Отменен",
    5: "Удален"
}


export const BACKGROUNDS : Record<number, string> = {
    1: "injected",
    2: "atwork",
    3: "completed",
    4: "cancelled",
    5: "deleted",
}