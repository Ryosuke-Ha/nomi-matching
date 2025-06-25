import React, { useState, FormEvent, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("auth") === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // TODO : refactor
    try {
      const doc = await db.collection("accounts").doc(id).get();
      if (!doc.exists) throw new Error("No user");
      const data = doc.data() as { passwordHash: string };
      const match = bcrypt.compareSync(password, data.passwordHash);
      if (match) {
        sessionStorage.setItem("auth", "true");
        sessionStorage.setItem("uid", id);
        navigate("/");
      } else {
        throw new Error("Invalid");
      }
    } catch {
      setError(true);
    }
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <i className="material-icons beer-icon">local_drink</i>
        <h1>nomi-matching</h1>
      </header>
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="login-id">ID</label>
          <input
            id="login-id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <label htmlFor="login-password">パスワード</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="error-message">
            {error ? "認証に失敗しました" : ""}
          </div>
          <button type="submit">ログイン</button>
        </form>
        <Link to="/signup" className="auth-link">
          新規登録はこちら
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

export default LoginPage;
