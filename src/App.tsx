import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UsersReview from "./pages/UsersReview";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Welcome from "pages/Welcome";
import { AppLayout } from "pages/AppLayout";
import Login from "pages/Login";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import UserProfile from "pages/UsersReview/views/UserProfile";
import Products from "pages/Products";
import { queryClient } from "utils/reactQuery/queryClient";

function App() {
  
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Welcome />} />
            <Route path="/users">
              <Route index element={<UsersReview />} />
              <Route path=":id" element={<UserProfile />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
