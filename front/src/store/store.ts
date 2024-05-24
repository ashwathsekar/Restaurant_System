import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        user: userSlice   //slice name slice
    }
});

export default store;
