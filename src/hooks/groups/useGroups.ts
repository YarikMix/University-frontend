import {useDispatch, useSelector} from 'react-redux';
import {updateGroups, updateCourse, updateEducationType, updateQuery, updateFaculties, updateSelectedFaculties, pageChanged, pageSizeChanged, totalCountChanged} from "../../store/groups/groupsSlice";
import {api} from "../../utils/api";

export function useGroups() {
	const groups = useSelector(state => state.groups.groups);
	const course = useSelector(state => state.groups.course);
	const education_type = useSelector(state => state.groups.education_type);
	const query = useSelector(state => state.groups.query);
	const faculties = useSelector(state => state.groups.faculties);
	const selectedFaculties = useSelector(state => state.groups.selectedFaculties);
	const queryPageIndex = useSelector(state => state.groups.queryPageIndex);
	const queryPageSize = useSelector(state => state.groups.queryPageSize);
	const totalCount = useSelector(state => state.groups.totalCount);

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

	const setGroupsPage = (value) => {
		dispatch(pageChanged(value))
	}

	const setGroupsPageSize = (value) => {
		dispatch(pageSizeChanged(value))
	}

	const setGroupsPageTotalCount = (value) => {
		dispatch(totalCountChanged(value))
	}

	const searchGroups = async (pageNumber = queryPageIndex, pageSize = queryPageSize) => {

		const offset = pageNumber * pageSize

		const {data} = await api.get(`groups/search/`, {
			params: {
				course: course,
				education_type: education_type,
				query: query,
				faculties: `[${selectedFaculties}]`,
				offset: offset,
				limit: pageSize
			}
		})

		return data
	}
	
	return {
		groups,
		setGroups,
		searchGroups,
		course,
		setCourse,
		education_type,
		setEducationType,
		query,
		setQuery,
		faculties,
		setFaculties,
		selectedFaculties,
		setSelectedFaculties,
		queryPageIndex,
		queryPageSize,
		totalCount,
		setGroupsPage,
		setGroupsPageSize,
		setGroupsPageTotalCount
	};
}