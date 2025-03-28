import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { FadeLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
const Login = lazy(() => import("./pages/Login"));
const User = lazy(() => import("./pages/User"));

const App = () => {
  return (
    <Suspense fallback={<FallBack />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};

export default App;

const FallBack = () => {
  return (
    <div className="container h-screen flex justify-center items-center">
      <FadeLoader />
    </div>
  );
};
