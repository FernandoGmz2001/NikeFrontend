import React, { useState, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import UserPage from "./pages/UserPage/UserPage";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UsernameContext";

function App() {
  return (
    <NextUIProvider>
      <AuthProvider>
        <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route path="/profile" element={<UserPage />} />
        </Routes>
        </UserProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

export default App;
