import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	lesson: undefined
};

const selectedLessonSlice = createSlice({
	name: 'selectedLesson',
	initialState: initialState,
	reducers: {
		updateLesson(state, action) {
			state.lesson = action.payload
		}
	}
})

export const {updateLesson} = selectedLessonSlice.actions;

export default selectedLessonSlice.reducer;