import React, { FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import {
  getAuthFromSession,
  saveAuthToSession,
  saveUidToSession,
} from "../../../../shared/utils/session";
import { useLoginForm } from "../../application/hooks/useLoginForm";
import { LoginUserUseCase } from "../../application/usecases/LoginUserUseCase";
import { UserRepositoryFirebase } from "../../infrastructure/firebase/UserRepositoryFirebase";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { id, password, setId, setPassword, error, setError } = useLoginForm();

  useEffect(() => {
    if (getAuthFromSession()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const useCase = new LoginUserUseCase(new UserRepositoryFirebase());
    try {
      await useCase.execute(id, password);
      saveAuthToSession(true);
      saveUidToSession(id);
      navigate("/");
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
