import { RootState } from "./portfolioStore";
import { Action, createSlice } from "@reduxjs/toolkit";
import NavItemInterface from "../interfaces/NavItemInterface";

const defaultColors = {
  "red-theme": "#ef233c",
  "white-theme": "#edf2f4",
  "navy-theme": "#2b2d42",
  "blue-theme": "#0077b6",
  mask: "rgba(0, 0, 0, 0.3)",
  "mask-bold": "rgba(0, 0, 0, 0.8)",
  "top-layer": "rgba(255, 255, 255, 0.05)",
};

const defaultNavMenu: NavItemInterface[] = [
  {
    title: "About",
    url: "/#about",
  },
  {
    title: "Projects",
    url: "/#projects",
  },
  {
    title: "Contact",
    url: "/#contact",
  },
];

const defaultThumbnails: string[] = [
  "https://images.pexels.com/photos/6991346/pexels-photo-6991346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/323645/pexels-photo-323645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

type GlobalStateProps = {
  isMasked: boolean;
  currentHomeView: string;
  isGlobalLoading: boolean;
  colors: any;
  navMenu: NavItemInterface[];
};

const initialState: GlobalStateProps = {
  isMasked: false,
  currentHomeView: "",
  isGlobalLoading: false,
  colors: defaultColors,
  navMenu: defaultNavMenu,
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
    changeMenu: (state, action) => {
      return { ...state, navMenu: action.payload };
    },
    initiateMenu: (state) => {
      return { ...state, navMenu: [...defaultNavMenu] };
    },
    clearMenu: (state) => {
      return { ...state, navMenu: [] };
    },
  },
});

export const {
  onMasked,
  offMasked,
  startLoading,
  stopLoading,
  changeMenu,
  initiateMenu,
  clearMenu,
} = globalStateSlice.actions;
export const selectGlobalState = (state: RootState) => state.globalState;
export default globalStateSlice.reducer;
