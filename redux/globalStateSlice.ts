import { RootState } from "./portfolioStore";
import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import NavItemInterface from "../interfaces/NavItemInterface";

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
  isMaskClosable: boolean;
  currentHomeView: string;
  isGlobalLoading: boolean;
  navMenu: NavItemInterface[];
  successState: {
    color?: string;
    msg: string;
  };
};

const initialState: GlobalStateProps = {
  isMasked: false,
  isMaskClosable: false,
  currentHomeView: "",
  isGlobalLoading: false,
  navMenu: defaultNavMenu,
  successState: {
    color: "#52b788",
    msg: "",
  },
};

const globalStateSlice = createSlice({
  name: "globalState",
  initialState: { ...initialState },
  reducers: {
    onMasked: (state, action: PayloadAction<boolean>) => {
      state.isMasked = true;
      state.isMaskClosable = action.payload ? action.payload : false;
    },
    offMasked: (state) => {
      state.isMasked = false;
      state.isMaskClosable = false;
    },
    startLoading: (state) => {
      state.isGlobalLoading = true;
      state.isMasked = true;
    },
    stopLoading: (
      state,
      action: PayloadAction<{ msg?: string; color?: string } | undefined>
    ) => {
      if (action.payload?.msg) {
        state.successState = {
          msg: action.payload?.msg,
          color: action.payload?.color ? action.payload?.color : "#52b788",
        };
      } else {
        state.isMasked = false;
      }
      state.isGlobalLoading = false;
    },
    closeSuccessMsg: (state) => {
      state.successState = {
        color: "#52b788",
        msg: "",
      };
      state.isMasked = false;
    },
    changeMenu: (state, action) => {
      state.navMenu = action.payload;
    },
    initiateMenu: (state) => {
      state.navMenu = [...defaultNavMenu];
    },
    clearMenu: (state) => {
      state.navMenu = [];
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
  closeSuccessMsg,
} = globalStateSlice.actions;
export const selectGlobalState = (state: RootState) => state.globalState;
export default globalStateSlice.reducer;
