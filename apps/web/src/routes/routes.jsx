import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  Login,
  Portfolios,
  PortfolioDetails,
  Companies,
  CreateAccount,
} from "../pages";
import IP from "../services/ip";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/configs/firebase.config";

const AppRoutes = () => {
  const location = useLocation();
  const [user, setUser] = useState();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    IP.refreshIP();
  }, [location]);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
        setAuthChecked(true);
      });
    }
  }, []);

  function RouteCheckAuth({ children, path = "/" }) {
    if (!authChecked) return null;
    if (!user) return <Navigate to={path} />;
    return children;
  }

  function RouteOnlyWithoutAuth({ children, path }) {
    if (!authChecked) return null; // Ainda verificando a autenticação, não renderiza nada
    if (user) return <Navigate to={path} />;
    return children;
  }

  const routes = [
    {
      path: "/",
      element: (
        <RouteOnlyWithoutAuth path="/portfolios">
          <Login />
        </RouteOnlyWithoutAuth>
      ),
    },
    {
      path: "/createaccount",
      element: (
        <RouteOnlyWithoutAuth path="/portfolios">
          <CreateAccount />
        </RouteOnlyWithoutAuth>
      ),
    },
    {
      path: "/portfolios/:id",
      element: (
        <RouteCheckAuth path="/">
          <PortfolioDetails />
        </RouteCheckAuth>
      ),
    },
    {
      path: "/portfolios",
      element: (
        <RouteCheckAuth path="/">
          <Portfolios />
        </RouteCheckAuth>
      ),
    },
    {
      path: "/companies",
      element: <Companies />,
    },
  ];

  return (
    <Routes>
      {routes.map((item, index) => (
        <Route exact path={item.path} element={item.element} key={index} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
