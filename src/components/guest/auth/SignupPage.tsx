import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import "./SignupPage.css";

const SignupPage: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: implement signup logic
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <i className="material-icons beer-icon">local_drink</i>
        <h1>nomi-matching</h1>
      </header>
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">登録</button>
        </form>
        <Link to="/login" className="auth-link">
          ログインはこちら
        </Link>
      </div>
      <footer className="auth-footer">
        <a href="#">プライバシーポリシー</a>
        <a href="#">利用規約</a>
        <a href="#">会社概要</a>
        <p>© 2025 nomi-matching</p>
      </footer>
    </div>
  );
};

export default SignupPage;
