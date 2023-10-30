import {createSlice} from "@reduxjs/toolkit"

const initialState= {
	lessons: []
};

const lessonsSlice = createSlice({
	name: 'lessons',
	initialState: initialState,
	reducers: {
		updateLessons(state, action) {
			state.lessons = action.payload
		},
		updateLesson(state, action) {
			state.lessons = state.lessons.map(lesson => {
				if (lesson.id !== action.payload.id) {
					return lesson
				}

				return {
					...action.payload
				}
			})
		}
	}
})

export const {updateLessons, updateLesson} = lessonsSlice.actions;

export default lessonsSlice.reducer;