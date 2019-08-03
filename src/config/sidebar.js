import AddCompany from "views/Companies/AddCompany"
import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import  Companies from "views/Companies/Companies"


var sidebar = [
  {
    path:"/admin/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
  },
  {
    path:"/admin/user",
    name: "Form",
    icon: "nc-icon nc-single-02",
  },
  {
    path:"/admin/companies",
    name: "Companies",
    icon: "nc-icon nc-tile-56",
  },  
 
  
];
export default sidebar;
