import React from "react";
import { Switch } from "react-router-dom";
import sidebar from "config/sidebar";
import routes from "routes/routes";
import PrivateRoute from "config/PrivateRoute";

class ContentMapping extends React.Component {
  render() {
    return (
      <Switch>
        {
          routes.map((prop , key) => {
            return (
            <PrivateRoute
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
               
          })
          
        }
      
      </Switch>
    );
  }
}

export default ContentMapping;
