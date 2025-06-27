import React from "react";
import ErrorPage from "./modules/guest/interface/pages/ErrorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./shared/utils/RouteGuards";
import Layout from "./modules/guest/interface/Layout";
import HomePage from "./modules/guest/interface/pages/HomePage";
import SearchPage from "./modules/guest/interface/pages/SearchPage";
import ChatPage from "./modules/guest/interface/pages/ChatPage";
import ChatDetailPage from "./modules/guest/interface/pages/ChatDetailPage";
import LoginPage from "./modules/guest/interface/pages/LoginPage";
import SignupPage from "./modules/guest/interface/pages/SignupPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:id" element={<ChatDetailPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Route>
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
