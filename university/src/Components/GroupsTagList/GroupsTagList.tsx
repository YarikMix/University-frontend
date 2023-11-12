import "./GroupTagList.sass"
import GroupTag from "./GroupTag/GroupTag";
import {Group, Lesson} from "../../Types";
import {Dispatch} from "react";

const GroupsTagList = ({lesson, setGroups, readOnly=true}:{lesson:Lesson, setGroups:Dispatch<Group[]>, readOnly:boolean}) => {

	if (lesson == undefined)
	{
		return (
			<div className="groups-tag-list-wrapper">

			</div>
		)
	}

	const groups = lesson.groups.map(group => {
		return <GroupTag lesson={lesson} setGroups={setGroups} group={group} readOnly={readOnly} key={group.id} />
	})

	return (
		<div className="groups-tag-list-wrapper">

			{ groups.length > 0 ? groups : <span className="title">Группы не выбраны</span> }

		</div>
	)
}

export default GroupsTagList