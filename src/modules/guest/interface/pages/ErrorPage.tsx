import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <div className="error-card">
        <h2>システムエラーが発生しました</h2>
        <p>申し訳ありません。再度ログインをお試しください。</p>
        <button onClick={() => navigate("/login")}>ログイン画面へ</button>
      </div>
    </div>
  );
};

export default ErrorPage;
