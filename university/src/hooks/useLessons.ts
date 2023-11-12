import {useDispatch, useSelector} from 'react-redux';
import {pageChanged, pageSizeChanged, totalCountChanged} from "../store/lessonsSlice";

export function useLessons() {
	const queryPageIndex = useSelector(state => state.lessons.queryPageIndex);
	const queryPageSize = useSelector(state => state.lessons.queryPageSize);
	const totalCount = useSelector(state => state.lessons.totalCount);

	const dispatch = useDispatch()

	const setLessonsPage = (value) => {
		dispatch(pageChanged(value))
	}

	const setLessonsPageSize = (value) => {
		dispatch(pageSizeChanged(value))
	}

	const setLessonsPageTotalCount = (value) => {
		dispatch(totalCountChanged(value))
	}

	return {
		queryPageIndex,
		queryPageSize,
		totalCount,
		setLessonsPage,
		setLessonsPageSize,
		setLessonsPageTotalCount
	};
}