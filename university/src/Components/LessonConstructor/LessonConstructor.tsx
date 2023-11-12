import "./LessonConstructor.sass"
import {useDraftLesson} from "../../hooks/useDraftLesson";
import {Link} from "react-router-dom";

const LessonConstructor = () => {

	const {lesson} = useDraftLesson()

	return (
		<Link to="/lessons/draft/" className="lesson-constructor-container">
			<span className="title">Черновик занятия</span>
			{lesson?.groups.length > 0 && <span className="badge">{lesson?.groups.length}</span>}
		</Link>
	)
}

export default LessonConstructor;