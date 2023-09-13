/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import AdminUsers from "layouts/Admin-users/index";
import EditUsers from "layouts/Admin-users/editAdmin"
import Editprofile from "layouts/profile/components/Header/edit-profile"
import Categary from "layouts/categary-management/index"
import CategaryAdd from "layouts/categary-management/add-categary"
import EditCategary from "layouts/categary-management/edit-catogery"
import Product from "layouts/product-management/productList"
//import ProductList from "layouts/product-management/productList"
import AddProduct from "layouts/product-management/add-product"
import Editproduct from "layouts/product-management/edit-product"
import Banner from "layouts/banner-management/banner" 
import BannerAdd from "layouts/banner-management/add-banner"
import Editbanner from "layouts/banner-management/edit-banner"

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin-Users",
    key: "adminUsers",
    route: "/adminUsers",
    icon: <Office size="12px" />,
    component: <AdminUsers />,
    noCollapse: true,
  },

  {
    // type: "collapse",
    // name: "EditUsers",
    key: "EditUsers",
    route: "/editAdmin/:id",
    // icon: <Office size="12px" />,
    component: <EditUsers />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Product-Management",
    key: "Product",
    route: "/product-management",
    icon: <Shop size="12px" />,
    component: <Product/>,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "EditUsers",
    // key: "product-list",
    // route: "/ProductList",
    // icon: <Office size="12px" />,
    // component: <ProductList />,
    // noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "EditUsers",
    key: "AddProduct",
    route: "/add-product",
    // icon: <Office size="12px" />,
    component: <AddProduct/>,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "EditUsers",
    key: "Editproduct",
    route: "/edit-product/:id",
    // icon: <Office size="12px" />,
    component: <Editproduct />,
    noCollapse: true,
  },
  {
    //  type: "collapse",
    //  name: "editprofile",
    key: "Editprofile",
    route: "/edit-profile/:id",
     icon: <Office size="12px" />,
    component: <Editprofile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Categary-Management",
    key: "Categary",
    route: "/categary-management",
    icon: <Office size="12px" />,
    component: <Categary />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "Add-categary",
    key: "CategaryAdd",
    route: "/add-categary",
    icon: <Office size="12px" />,
    component: <CategaryAdd />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "Add-categary",
    key: "EditCategary",
    route: "/edit-catogery/:id",
    icon: <Office size="12px" />,
    component: <EditCategary />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "banner-Management",
    key: "banner",
    route: "/banner-management",
    icon: <Shop size="12px" />,
    component: <Banner/>,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "Add-banner",
    key: "banneryAdd",
    route: "/add-banner",
    icon: <Office size="12px" />,
    component: <BannerAdd />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "EditUsers",
    key: "Editbanner",
    route: "/edit-banner/:id",
    // icon: <Office size="12px" />,
    component: <Editbanner />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
 
  {
   // type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
   // type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
  //  type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: <RTL />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
