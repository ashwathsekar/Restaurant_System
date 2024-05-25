import { createSlice } from "@reduxjs/toolkit";

const initialState :any = [];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action){
            state.push(action.payload); // get data in payload and update state
        }
        ,
        remove(state, action){
            return state.filter((item: any) => item.name !== action.payload.name); // get data in payload and update state
        }

    }
});

export const {add, remove} = cartSlice.actions          // all action fucntion. here to export
export default cartSlice.reducer;