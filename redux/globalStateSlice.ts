import { RootState } from "./portfolioStore";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMasked: false,
  currentHomeView: "",
};

const globalStateSlice = createSlice({
  name: "globalState",
  initialState: { ...initialState },
  reducers: {
    onMasked: (state) => {
      return { ...state, isMasked: true };
    },
    offMasked: (state) => {
      return { ...state, isMasked: false };
    },
  },
});

export const { onMasked, offMasked } = globalStateSlice.actions;
export const selectGlobalState = (state: RootState) => state.globalState;
export default globalStateSlice.reducer;
