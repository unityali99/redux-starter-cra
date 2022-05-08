//#region
// import { createStore, applyMiddleware } from "redux";
// import { devToolsEnhancer } from "@redux-devtools/extension";
// import func from "./middleware/func";
//#endregion
// import logger from "./middleware/logger";
import { configureStore } from "@reduxjs/toolkit";
import toastify from "./middleware/toastify";
import reducer from "./reducer";
import api from "./middleware/api";

export default function configureAddStore() {
  //#region
  // Main Store
  // FIRST WAY =>
  //return createStore(reducer, devToolsEnhancer({ trace: true }));
  //SECOND WAY BY USING Redux Toolkit
  //#endregion
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(/*logger("Console"),*/ toastify, api),
  });
}

// USE MIDDLEWARE WITHOUT REDUX TOOLKITS =====>> return createStore(reducer,applyMiddleWare);
