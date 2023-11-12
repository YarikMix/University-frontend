import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	isOpen: false,
};

const modalSlice = createSlice({
	name: 'lessonForm',
	initialState: initialState,
	reducers: {
		setOpen(state, action) {
			state.isOpen = action.payload
		}
	}
})

export const {setOpen} = modalSlice.actions;

export default modalSlice.reducer;