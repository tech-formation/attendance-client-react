import AddCompany from "views/Companies/AddCompany"

var internalroutes = [
  {
    path: "/company/add",
    name: "Add Comapany",
    component: AddCompany,
    layout: "/admin"
  },
  {
    path: "/company/edit/:id",
    name: "Edit Company",
    component: AddCompany,
    layout: "/admin"
  },
  
];


export default internalroutes;
