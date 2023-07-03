import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Welcome from "pages/Welcome";
import { AppLayout } from "pages/AppLayout";
import Login from "pages/Login";
import UserProfile from "pages/UsersReview/views/UserProfile";
import Products from "pages/Products";
import UsersReview from "pages/UsersReview";
import Employees from "pages/Employees";
import EmployeesWithApollo from "pages/EmployeesWithApollo";
import NotFound from "pages/NotFound";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Welcome />} />
      <Route path="/users">
        <Route index element={<UsersReview />} />
        <Route path=":id" element={<UserProfile />} />
      </Route>
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees-apollo" element={<EmployeesWithApollo />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
