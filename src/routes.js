import Dashboard from "views/Dashboard.jsx";
import AddCompany from "views/Companies/AddCompany";
import UserPage from "views/User.jsx";
import  Companies from "views/Companies/Companies"


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
    path: "/add-commpany",
    name: "Add Company",
    icon: "nc-icon nc-tile-56",
    component: AddCompany,
    layout: "/admin"
  },
  {
    path: "/companies",
    name: "Companies",
    icon: "nc-icon nc-tile-56",
    component: Companies,
    layout: "/admin"
  }
];
export default routes;
