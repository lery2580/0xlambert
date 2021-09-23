import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { Routers } from "./routers";
import "lib-flexible";
import "./App.less";
import config from "./config/index";
function App() {
  return (
    <Switch>
      {Routers.map((router) => (
        <Route
          exact={!router.notExect}
          key={router.path}
          path={router.path}
          component={router.component}
        ></Route>
      ))}
      {/* 默认路由 */}
      <Redirect push exact to={config.preLink + "/"} />
    </Switch>
  );
}

export default withRouter(App);
