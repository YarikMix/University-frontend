import "./GroupTag.sass"
import {AiOutlineClose} from "react-icons/ai";
import {useEffect, useState} from "react";
import {Group} from "../../../../../../Types";
import {DOMEN} from "../../../../../../Consts";
import axios, {AxiosResponse} from "axios";
import {useLesson} from "../../../../../../hooks/useLesson";
import {useToken} from "../../../../../../hooks/useToken";
import {groupRemoveMessage} from "../../../../../../Toasts/Toasts";

const GroupTag = ({group_id, isEnabled}) => {

	const { lesson, setLesson } = useLesson()

	const { token } = useToken()

	const [group, setGroup] = useState<Group>()

	const fetchData = async () => {

		const response = await axios(`${DOMEN}/api/groups/${group_id}`, {
			method: "GET"
		});

		setGroup(response.data)

	};

	useEffect(() => {
		fetchData()
	}, [])


	const removeGroup = async () => {
		const response: Promise<AxiosResponse> | any = await axios(`${DOMEN}/api/lessons/${lesson.id}/delete_group/${group_id}/`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				'authorization': `${token}`
			},
		});

		setLesson(response.data)

		groupRemoveMessage(group?.name, lesson.id)
	}

	return (
		<div className="tag-item">
			<span>{group?.name}</span>
			{isEnabled && <AiOutlineClose className="close-btn" onClick={removeGroup}/> }
		</div>
	)
}

export default GroupTag;