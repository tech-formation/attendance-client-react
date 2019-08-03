import AddCompany from "views/Companies/AddCompany"
import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import  Companies from "views/Companies/Companies"

  var routes = [
    {
      path: "/dashboard",
      component: Dashboard,
      layout: "/admin"
    },
    {
      path: "/user",
      component: UserPage,
      layout: "/admin"
    },
    {
      path: "/companies",
      component: Companies,
      layout: "/admin"
    },
    {
      path: "/company/add",
      component: AddCompany,
      layout: "/admin"
    },
    {
      path: "/company/edit/:id",
      component: AddCompany,
      layout: "/admin"
    },
    
  ];


  export default routes;
