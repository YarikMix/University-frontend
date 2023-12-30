import "./LessonForm.sass"
import {BACKGROUNDS, LESSON_DAY, LESSON_TIME, STATUSES} from "/src/Consts";
import * as React from "react";
import {FaRegStickyNote} from "react-icons/fa";
import {MdOutlineWorkHistory} from "react-icons/md";
import {AiFillCheckCircle, AiFillDelete} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import styled from "styled-components";
import GroupsTagList from "/src/Components/GroupsTagList/GroupsTagList";
import {useSelectedLesson} from "/src/hooks/useSelectedLesson";

const LessonForm = () => {

	const { lesson, setLesson } = useSelectedLesson()

	const statusIcons : Record<number, React.ReactElement> = {
		1: <FaRegStickyNote className={"status-icon"} />,
		2: <MdOutlineWorkHistory className={"status-icon"} />,
		3: <AiFillCheckCircle className={"status-icon"} />,
		4: <ImCancelCircle className={"status-icon"} />,
		5: <AiFillDelete className={"status-icon"} />,
	}

	if (lesson == undefined || lesson.status == 1)
	{
		return (
			<div>

			</div>
		)
	}

	return (
		<form className="input-container-wrapper disabled">

			<span className="form-title">Занятие №{lesson.id}</span>

			<StatusInfoContainer className={"status-info-container"} theme={BACKGROUNDS[lesson.status]}>

				<span className={"selected"}>{STATUSES.find(status => status.id == lesson.status).name}</span>

				{statusIcons[lesson.status]}

			</StatusInfoContainer>

			<GroupsTagList lesson={lesson} readOnly={true} setLesson={setLesson}/>

			<div className="input-container">
				<span>{LESSON_TIME.find(time => time.id == lesson.time).name}</span>
			</div>

			<div className="input-container">
				<span>{LESSON_DAY.find(day => day.id == lesson.day_of_week).full_name}</span>
			</div>

			<div className="input-container">
				<span>{lesson.discipline}</span>
			</div>

			<div className="input-container">
				<span>{lesson.audience}</span>
			</div>

			<div className="input-container">
				<span>{lesson.teacher}</span>
			</div>

		</form>

	)
}

const StatusInfoContainer = styled.div`
    background-color: ${( props ) => props.theme };
`

export default LessonForm;