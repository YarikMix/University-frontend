import {configureStore} from "@reduxjs/toolkit";

import groupReducer from "./selectedGroupSlice"
import draftLessonReducer from "./draftLessonSlice"
import selectedLessonReducer from "./selectedLessonSlice"
import authReducer from "./authSlice"
import lessonFormReducer from "./lessonFormSliсe"
import lessonsReducer from "./lessonsSlice"
import groupFilters from "./groupFiltersSlice"

export default configureStore({
	reducer: {
		selectedGroup: groupReducer,
		groupFilters: groupFilters,
		draftLesson: draftLessonReducer,
		selectedLesson: selectedLessonReducer,
		lessons: lessonsReducer,
		user: authReducer,
		lessonForm: lessonFormReducer
	}
});