// import React, { useEffect } from "react";
import Login from "./components/Auth/Login";
import EmployeDashboard from "./components/Dashboard/EmployeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Auth/register";
import { useEffect, useState } from "react";

export default function App() {
  // const [tasts, settasks] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  function isTokenExpired() {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    } else {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      const exp = payload.exp;
      console.log("exp: ", exp);
      const now = Math.floor(Date.now() / 1000);
      console.log("now: ", now);

      console.log(exp < now);
      return exp < now;
    }
  }

  async function getMyData() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Login nhi hai user");
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const expired = isTokenExpired();

    if (expired) {
      setIsLogin(false);
      localStorage.removeItem("token");
    } else {
      setIsLogin(true);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/hello",
      element: "<h1>Hello World</h1>",
    },
    {
      path: "/",
      element: <Login getMyData={getMyData} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <EmployeDashboard refreshTasks={getMyData} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/taskForm",
      element: (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <EmployeDashboard /> */}
      {/* <AdminDashboard /> */}
    </>
  );
}
