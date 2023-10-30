import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	lesson: {
		id: -1,
		status: 1,
		discipline: "",
		audience: "",
		teacher: "",
		groups: [],
		time: 1,
		day_of_week: 1
	}
};

const lessonSlice = createSlice({
	name: 'selectedLesson',
	initialState: initialState,
	reducers: {
		updateLesson(state, action) {
			state.lesson = action.payload
		}
	}
})

export const {updateLesson} = lessonSlice.actions;

export default lessonSlice.reducer;