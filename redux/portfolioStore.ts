import { configureStore } from "@reduxjs/toolkit";
import { portfolioApi } from "./apisSlice";
import globalStateSlice from "./globalStateSlice";

const portfolioStore = configureStore({
  reducer: {
    globalState: globalStateSlice,
    [portfolioApi.reducerPath]: portfolioApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(portfolioApi.middleware),
});

export type RootState = ReturnType<typeof portfolioStore.getState>;
export default portfolioStore;
