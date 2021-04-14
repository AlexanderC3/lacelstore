import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import createSagaMidle from "redux-saga";
import rootSaga from "./rootSaga";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMidle();

export const middlewares = [thunk, logger, sagaMiddleware];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {
  store,
  persistor,
};
