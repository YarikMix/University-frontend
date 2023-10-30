import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	group: undefined,
};

const groupSlice = createSlice({
	name: 'selectedGroup',
	initialState: initialState,
	reducers: {
		updateGroup(state, action) {
			state.group = action.payload
		}
	}
})

export const {updateGroup} = groupSlice.actions;

export default groupSlice.reducer;