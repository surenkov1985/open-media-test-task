import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import dataReducer from "./dataReducer";

export const store = configureStore({
	reducer: {
		data: dataReducer,
	},
});

setupListeners(store.dispatch);
