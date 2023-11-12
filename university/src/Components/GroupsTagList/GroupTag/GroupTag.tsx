import "./GroupTag.sass"
import {AiOutlineClose} from "react-icons/ai";
import {DOMEN} from "/src/Consts";
import {Response} from "/src/Types";
import axios from "axios";
import {useToken} from "/src/hooks/useToken";
import {groupRemoveMessage} from "/src/Toasts/Toasts";

const GroupTag = ({lesson, setGroups, group, readOnly}) => {

	const { access_token } = useToken()

	const removeGroup = async () => {
		const response: Response | any = await axios(`${DOMEN}/api/lessons/${lesson.id}/delete_group/${group.id}/`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				'authorization': access_token
			},
		});

		console.log(response.data)

		setGroups(response.data)

		groupRemoveMessage(group?.name, lesson.id)
	}

	return (
		<div className="tag-item">
			<span>{group?.name}</span>
			{!readOnly && <AiOutlineClose className="close-btn" onClick={removeGroup}/> }
		</div>
	)
}

export default GroupTag;