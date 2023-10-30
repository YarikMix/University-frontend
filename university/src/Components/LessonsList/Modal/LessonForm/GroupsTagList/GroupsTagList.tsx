import "./GroupTagList.sass"
import {useLesson} from "../../../../../hooks/useLesson";
import GroupTag from "./GroupTag/GroupTag";

const GroupsTagList = ({isEnabled=true}) => {

	const { lesson } = useLesson()

	const lessons = lesson.groups.map(group_id => {
		return <GroupTag group_id={group_id} isEnabled={isEnabled} key={group_id}/>
	})

	return (
		<div className="groups-tag-list-wrapper">

			{ lessons.length > 0 ? lessons : <span className="title">Группы не выбраны</span> }

		</div>
	)
}

export default GroupsTagList