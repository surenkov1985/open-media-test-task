import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
	name: "data",
	initialState: {
		links: localStorage.hasOwnProperty("media-player") ? JSON.parse(localStorage.getItem("media-player")) : [],
	},
	reducers: {
		pushLink(state, actions) {
			if (!state.links.includes(actions.payload)) {
				state.links.push(actions.payload);
				localStorage.setItem("media-player", JSON.stringify(state.links));
			}
		},
	},
});

export const { pushLink } = dataSlice.actions;
export default dataSlice.reducer;
