import React, { memo } from "react";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import routes from "./router";
import store from "./store";

import ZWAppHeader from "@/components/app-header";
import ZWAppFooter from "@/components/app-footer";
import ZWAppPlayerBar from "./pages/player/app-playe-bar";

import { HashRouter } from "react-router-dom";

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <ZWAppHeader />
        {renderRoutes(routes)}
        <ZWAppFooter />
        <ZWAppPlayerBar />
      </HashRouter>
    </Provider>
  );
});
