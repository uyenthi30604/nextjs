import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import qrCodeReducer from "./features/qrcode/codeDataSlice";

export const store = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      qrcode: qrCodeReducer,
    },
  });
};

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
