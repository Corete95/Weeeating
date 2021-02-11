import React from "react";
import ReactDOM from "react-dom";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
import Routes from "./routes";
//import RootReducer from "./store/reducers";

//const store = createStore(RootReducer);

ReactDOM.render(
  // <Provider store={store}>
  <Routes />,
  //  </Provider>,
  document.getElementById("root")
);
// store.subscribe(() =>
//   console.log("This is the newly changed state >>>", store.getState())
// );
