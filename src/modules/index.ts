import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import gameReducer from "./game";
import statusReducer from "./status";

const sessionPersistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["gameSetting"],
};

const rootReducer = combineReducers({
  gameSetting: gameReducer,
  gameStatus: statusReducer,
});

const persistedReducer = persistReducer(sessionPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
