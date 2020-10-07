import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import { reducer as formReducer } from "redux-form";

import auth from "../modules/auth";
import home from "../modules/home";
import provider from "../modules/providers";
import product from "../modules/products";
import productType from "../modules/productType";
import store from "../modules/stores";
import cart from "../modules/cart"

export default function configureStore(history, initialState) {
  const reducers = {
    form: formReducer,
    router: connectRouter(history),
    auth,
    home,
    provider,
    product,
    productType,
    store,
    cart
  };

  const middleware = [thunk, routerMiddleware(history)];

  const enhancers = [];
  // eslint-disable-next-line no-undef
  const isDevelopment = process.env.NODE_ENV === "development";

  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
}
