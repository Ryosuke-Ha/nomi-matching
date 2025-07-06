import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "firebase/compat/firestore";
import "./SignupPage.css";
import {
  saveAuthToSession,
  saveUidToSession,
} from "../../../../shared/utils/session";
import { useSignupForm } from "../../application/hooks/useSignupForm";
import { SignupUserUseCase } from "../../application/usecases/SignupUserUseCase";
import { UserRepositoryFirebase } from "../../infrastructure/firebase/UserRepositoryFirebase";

const SignupPage: React.FC = () => {
  const formProps = useSignupForm();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const useCase = new SignupUserUseCase(new UserRepositoryFirebase());
    await useCase.execute(formProps.form);
    saveAuthToSession(true);
    saveUidToSession(formProps.form.id);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <i className="material-icons beer-icon">local_drink</i>
        <h1>nomi-matching</h1>
      </header>
      <div className="auth-card">
        {formProps.step === 1 && (
          <div className="step">
            <label htmlFor="id">
              ID <span className="required">必須</span>
              <input
                id="id"
                name="id"
                placeholder="ID"
                value={formProps.form.id}
                onChange={formProps.handleChange}
              />
            </label>
            <span className="error-message">{formProps.errors.id || ""}</span>
            <label htmlFor="password">
              パスワード <span className="required">必須</span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="パスワード"
                value={formProps.form.password}
                onChange={formProps.handleChange}
              />
            </label>
            <span className="error-message">
              {formProps.errors.password || ""}
            </span>
            <label htmlFor="confirmPassword">
              確認用パスワード <span className="required">必須</span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="確認用パスワード"
                value={formProps.form.confirmPassword}
                onChange={formProps.handleChange}
              />
            </label>
            <span className="error-message">
              {formProps.errors.confirmPassword || ""}
            </span>
            <button onClick={formProps.handleNext}>次へ</button>
          </div>
        )}
        {formProps.step === 2 && (
          <div className="step">
            <label htmlFor="name">
              名前 <span className="required">必須</span>
              <input
                id="name"
                name="name"
                placeholder="名前"
                value={formProps.form.name}
                onChange={formProps.handleChange}
              />
            </label>
            <span className="error-message">{formProps.errors.name || ""}</span>
            <label htmlFor="age">
              年齢 <span className="required">必須</span>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="年齢"
                value={formProps.form.age}
                onChange={formProps.handleChange}
              />
            </label>
            <span className="error-message">{formProps.errors.age || ""}</span>
            <label htmlFor="region">
              地域 <span className="required">必須</span>
              <select
                id="region"
                name="region"
                value={formProps.form.region}
                onChange={formProps.handleChange}
              >
                <option value="">地域を選択</option>
                {formProps.areas.map((area) => (
                  <option key={area.id} value={area.id.toString()}>
                    {area.name}
                  </option>
                ))}
              </select>
            </label>
            <span className="error-message">
              {formProps.errors.region || ""}
            </span>
            <div className="button-group">
              <button onClick={formProps.handleBack}>戻る</button>
              <button onClick={formProps.handleNext}>次へ</button>
            </div>
          </div>
        )}
        {formProps.step === 3 && (
          <form className="step" onSubmit={handleSubmit}>
            <label htmlFor="availability">
              空いてる曜日と時間
              <input
                id="availability"
                name="availability"
                placeholder="空いてる曜日と時間"
                value={formProps.form.availability}
                onChange={formProps.handleChange}
              />
            </label>
            <span className="error-message">
              {formProps.errors.availability || ""}
            </span>
            <label htmlFor="personality">
              性格
              <input
                id="personality"
                name="personality"
                placeholder="性格"
                value={formProps.form.personality}
                onChange={formProps.handleChange}
              />
            </label>
            <span className="error-message">
              {formProps.errors.personality || ""}
            </span>
            <label htmlFor="participants">
              参加人数
              <input
                id="participants"
                name="participants"
                type="number"
                placeholder="参加人数"
                value={formProps.form.participants}
                onChange={formProps.handleChange}
              />
            </label>
            <span className="error-message">
              {formProps.errors.participants || ""}
            </span>
            <div className="button-group">
              <button type="button" onClick={formProps.handleBack}>
                戻る
              </button>
              <button type="submit">登録</button>
            </div>
          </form>
        )}
      </div>
      <footer className="auth-footer">
        <a href="/login">ログインへ戻る</a>
      </footer>
    </div>
  );
};

export default SignupPage;
