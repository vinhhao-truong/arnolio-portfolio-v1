import { configureStore } from "@reduxjs/toolkit";
import globalStateSlice from "./globalStateSlice";

const portfolioStore = configureStore({
  reducer: {
    globalState: globalStateSlice,
  },
});

export type RootState = ReturnType<typeof portfolioStore.getState>;
export default portfolioStore;
