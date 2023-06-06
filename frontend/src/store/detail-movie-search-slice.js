import { createSlice } from "@reduxjs/toolkit";
const detailMovieSearchSlice = createSlice({
    name: 'detail-movie-search',
    initialState: {isShow: false, data: {id: undefined}},
    reducers: {
        control(state, action) {
            if (state.isShow === true) {
                if (state.data.id !== action.payload.id) {
                state.data = action.payload;
                } else {
                state.isShow = false;
                }
            } else {
                state.isShow = true;
                state.data = action.payload;
            }
        }
    }
})

export const detailMovieSearchActions = detailMovieSearchSlice.actions
export default detailMovieSearchSlice.reducer