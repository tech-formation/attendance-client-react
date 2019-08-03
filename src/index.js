import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch ,Redirect} from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import store from "config/store";

import AdminLayout from "layouts/Admin";
import Home from "views/Home";
import Login from "views/Users/login"

const hist = createBrowserHistory();


ReactDOM.render(
  <Provider store={store}>  
    <Router history={hist}>
    <Switch>
      <Route path="/admin/*" render={ (props) => (
        localStorage.getItem("token") ? (
          <AdminLayout {...props} />
      ) : (
        <Redirect to="/login" />
      )
      )} />
      <Route path="/home" component={Home} />
      <Route path="*" component={Login} />
    </Switch>
  </Router>
  </Provider>
  ,
  document.getElementById("root")
);
