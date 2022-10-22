import { RootState } from "./portfolioStore";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMasked: false,
  currentHomeView: "",
  isGlobalLoading: false,
  colors: {
    "red-theme": "#ef233c",
    "white-theme": "#edf2f4",
    "navy-theme": "#2b2d42",
    "blue-theme": "#0077b6",
    mask: "rgba(0, 0, 0, 0.3)",
    "top-layer": "rgba(255, 255, 255, 0.05)",
  },
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
    startLoading: (state) => {
      return { ...state, isGlobalLoading: true, isMasked: true };
    },
    stopLoading: (state) => {
      return { ...state, isGlobalLoading: false, isMasked: false };
    },
  },
});

export const { onMasked, offMasked, startLoading, stopLoading } =
  globalStateSlice.actions;
export const selectGlobalState = (state: RootState) => state.globalState;
export default globalStateSlice.reducer;
