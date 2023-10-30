import {toast} from "react-toastify";

export const successMessage = (username) => {
	toast.success(`Добро пожаловать, ${username}!`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const errorMessage = () => {
	toast.error(`Неправильный логин или пароль`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const logOutMessage = () => {
	toast.info(`Вы вышли из аккаунта`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
}

export const groupAlreadyAddedMessage = () => {
	toast.warning(`Вы уже добавили эту группу в занятие`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const groupAddedMessage = (group_name, lesson_id) => {
	toast.success(`Группа ${group_name} успешно добавлена в занятие №${lesson_id}`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const groupRemoveMessage = (group_name, lesson_id) => {
	toast.info(`Группа ${group_name} успешно удалена из занятия №${lesson_id}`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const lessonDeleteMessage = (id) => {
	toast.info(`Занятие №${id} успешно удалено`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const lessonUpdateMessage = (id) => {
	toast.success(`Занятие №${id} успешно обновлено`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const requestErrorMessage = () => {
	toast.error(`Что-то пошло не так`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const emptyGroupsMessage = () => {
	toast.warning(`Добавьте группу в занятие`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};