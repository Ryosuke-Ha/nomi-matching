import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/guest/Layout";
import SearchPage from "./components/guest/search/SearchPage";
import PaymentPage from "./components/guest/payment/PaymentPage";
import HomePage from "./components/guest/home/HomePage";
import ChatPage from "./components/guest/chat/ChatPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
