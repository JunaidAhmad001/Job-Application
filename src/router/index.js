import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "../components/LoginPage";
import ForgotPage from "../components/ForgotPage";
import ApplicantForm from "../components/ApplicantForm";
import AdminDashboard from "../components/AdminDashboard";
import UserList from "../components/UserList";
import ActivityLogs from "../components/ActivityLogs";
import CreateUser from "../components/CreateUser";
import ConfirmPass from "../components/ConfirmPass";
import CreatedList from "../components/CreatedList";
import UserDashboard from "../components/UserDashboard";
import SetNewPass from "../components/SetNewPass";
import { useAppStore } from "../store/index";
const routes = [
  {
    path: "/ApplicantForm",
    name: "ApplicantForm",
    component: ApplicantForm,
  },
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
    meta: { requiresAuth: true },
    // children: [
    //   {
    //     path: "ForgotPage",
    //     component: ForgotPage,
    //     meta: { requiresAuth: true },
    //   },
    // ],
  },
  {
    path: "/ForgotPage",
    name: "ForgotPage",
    component: ForgotPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/ConfirmPass/:email",
    name: "ConfirmPass",
    component: ConfirmPass,
    meta: { requiresAuth: true },
  },
  {
    path: "/UserDashboard",
    name: "UserDashboard",
    component: UserDashboard,
    meta: { requiresAuth: true },
        children: [
          // { path: "ConfirmPass/:email", component: ConfirmPass},
          { path: "SetNewPass", component: SetNewPass},
          { path: "UserList", component: UserList },

    ],
  },
  {
    path: "/AdminDashboard",
    component: AdminDashboard,
    name: "AdminDashboard",
    meta: { requiresAuth: true, },
    children: [
      { path: "CreateUser", component: CreateUser , meta: {requiresAuth:true}},
      { path: "CreatedList", component: CreatedList , meta: {requiresAuth:true}},
      { path: "ActivityLogs", component: ActivityLogs , meta: {requiresAuth:true}},
      { path: "UserList", component: UserList , meta: {requiresAuth:true}},
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAppStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    // Check if user is logged in
    if (!store.adminLoggedIn && !store.token=='' ) {
      // Redirect to login page if not logged in
      next({ name: "LoginPage" });
    } else {

      // Check if the route requires admin role
      if (to.matched.some((record) => record.meta.requiresAdmin)) {
        if (store.adminLoggedIn) {
          // User is logged in as admin, allow access
          next();
        } else {
          // Redirect to login page if not an admin
          next({ name: "LoginPage" });
        }
      } else {
        // Allow access to routes that don't require admin role
        next();
      }
    }
  } else {
    // Allow access to routes that don't require authentication
    next();
  }
});




export default router;
