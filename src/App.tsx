// App.js
import React from "react";
import Automation from "./pages/Automation";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Automation />
      </Provider>
    </div>
  );
};

export default App;
