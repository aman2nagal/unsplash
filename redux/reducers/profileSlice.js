import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    searchedValue: [],
  },
  reducers: {
    SearchHistory: (state, action) => {
      if (
        state.searchedValue.includes(action.payload) ||
        action.payload === ""
      ) {
        return;
      } else if (state.searchedValue.length > 10) {
        state.searchedValue.shift();
      } else {
        state.searchedValue.push(action.payload);
      }
    },
  },
});

export const { SearchHistory } = profileSlice.actions;
export const searchedValue = profileSlice.state;
export default profileSlice.reducer;
