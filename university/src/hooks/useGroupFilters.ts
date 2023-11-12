import {useDispatch, useSelector} from 'react-redux';
import {updateGroups, updateCourse, updateEducationType, updateQuery, updateFaculties, updateSelectedFaculties} from "../store/groupFiltersSlice";

export function useGroupFilters() {
	const groups = useSelector(state => state.groupFilters.groups);
	const course = useSelector(state => state.groupFilters.course);
	const education_type = useSelector(state => state.groupFilters.education_type);
	const query = useSelector(state => state.groupFilters.query);
	const faculties = useSelector(state => state.groupFilters.faculties);
	const selectedFaculties = useSelector(state => state.groupFilters.selectedFaculties);

	const dispatch = useDispatch()

	const setGroups = (value) => {
		dispatch(updateGroups(value))
	}

	const setCourse = (value) => {
		dispatch(updateCourse(value))
	}

	const setEducationType = (value) => {
		dispatch(updateEducationType(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const setFaculties = (value) => {
		dispatch(updateFaculties(value))
	}

	const setSelectedFaculties = (value) => {
		dispatch(updateSelectedFaculties(value))
	}

	return {
		groups,
		setGroups,
		course,
		setCourse,
		education_type,
		setEducationType,
		query,
		setQuery,
		faculties,
		setFaculties,
		selectedFaculties,
		setSelectedFaculties
	};
}