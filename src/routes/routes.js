import Form from "views/Companies/form";
import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import Index from "views/Companies/index";
import HolidayIndex from "views/Holidays/holidayIndex";
import HolidayForm from "views/Holidays/holidayForm";

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
      component: Index,
      layout: "/admin"
    },
    {
      path: "/company/add",
      component: Form,
      layout: "/admin"
    },
    {
      path: "/company/edit/:id",
      component: Form,
      layout: "/admin"
    },
    {
      path: "/holidays",
      component: HolidayIndex,
      layout: "/admin"
    },
    {
      path: "/holiday/add",
      component: HolidayForm,
      layout: "/admin"
    },
    {
      path: "/holiday/edit/:id",
      component: HolidayForm,
      layout: "/admin"
    }
    
  ];


  export default routes;
