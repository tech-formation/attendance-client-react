import Dashboard from "views/Dashboard.jsx";
import TableList from "views/Tables.jsx";
import UserPage from "views/User.jsx";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "Form",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin"
  }
];
export default routes;
