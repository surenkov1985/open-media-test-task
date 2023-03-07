import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
	name: "data",
	initialState: {
		links: localStorage.hasOwnProperty("media-player") ? JSON.parse(localStorage.getItem("media-player")) : [],
		fileError : ""
	},
	reducers: {
		pushLink(state, actions) {
			if (!state.links.includes(actions.payload)) {
				state.links.push(actions.payload);
				localStorage.setItem("media-player", JSON.stringify(state.links));
			}
		},
		setFileError(state, actions) {
			state.fileError = actions.payload
		}
	},
});

export const { pushLink, setFileError } = dataSlice.actions;
export default dataSlice.reducer;
