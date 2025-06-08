import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/guest/Layout";
import SearchPage from "./components/guest/SearchPage";
import ReviewPage from "./components/guest/ReviewPage";
import PaymentPage from "./components/guest/PaymentPage";
import InvitationPage from "./components/guest/InvitationPage";
import HomePage from "./components/guest/HomePage";
import ChatPage from "./components/guest/ChatPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="reviews" element={<ReviewPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="invite" element={<InvitationPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
