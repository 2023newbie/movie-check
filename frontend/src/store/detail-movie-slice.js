import { createSlice } from "@reduxjs/toolkit";

const detailMovieSlice = createSlice({
  name: "detail-movie",
  initialState: {
    isShow: {
      trending: false,
      topRating: false,
      action: false,
      comedy: false,
      horror: false,
      romance: false,
      documentary: false,
    },
    data: {
      trending: { id: undefined },
      topRating: { id: undefined },
      action: { id: undefined },
      comedy: { id: undefined },
      horror: { id: undefined },
      romance: { id: undefined },
      documentary: { id: undefined },
    }
  },
  reducers: {
    control(state, action) {
      const data = action.payload.data
      const category = action.payload.category

      if (state.isShow[category] === true) {
        if (data.id !== state.data[category].id) {
          state.data[category] = data;
        } else {
          state.isShow[category] = false;
        }
      } else {
        state.isShow[category] = true;
        state.data[category] = data;
      }
    },
  },
});

export const detailMovieActions = detailMovieSlice.actions;
export default detailMovieSlice.reducer;
