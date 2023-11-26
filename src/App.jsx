import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate,Navigate  } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import UserPage from "./pages/UserPage/UserPage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        {authenticated ? (
          <>
            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route path="/profile" element={<UserPage />} />
          </>
        ) : null}
      </Routes>
    </NextUIProvider>
  );
}

export default App;
