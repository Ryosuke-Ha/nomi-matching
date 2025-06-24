import React from "react";
import ErrorPage from "./components/guest/auth/ErrorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./components/guest/auth/RouteGuards";
import Layout from "./components/guest/Layout";
import HomePage from "./components/guest/home/HomePage";
import SearchPage from "./components/guest/search/SearchPage";
import ChatPage from "./components/guest/chat/ChatPage";
import ChatDetailPage from "./components/guest/chat/ChatDetailPage";
import LoginPage from "./components/guest/auth/LoginPage";
import SignupPage from "./components/guest/auth/SignupPage";
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
