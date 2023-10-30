import {configureStore} from "@reduxjs/toolkit";

import groupReducer from "./groupSlice"
import lessonReducer from "./lessonSlice"
import authReducer from "./authSlice"
import modalReducer from "./modalSlise"
import lessonsReducer from "./lessonsSlice"

export default configureStore({
	reducer: {
		group: groupReducer,
		lesson: lessonReducer,
		lessons: lessonsReducer,
		user: authReducer,
		modal: modalReducer
	}
});