import React from "react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


class Dashboard extends React.Component {
  
  
  render() {
    return (
     <Breadcrumb>
        <BreadcrumbItem active>Home</BreadcrumbItem>
     </Breadcrumb>
    );
  }
}

export default Dashboard;
