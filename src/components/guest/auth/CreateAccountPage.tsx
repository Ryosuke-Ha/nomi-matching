import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccountPage.css";

const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    region: "",
    bio: "",
    availability: "",
    personality: "",
    participants: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.id) errs.id = "ID is required";
    if (!form.password) errs.password = "Password is required";
    if (!form.confirmPassword)
      errs.confirmPassword = "Confirm password is required";
    if (form.password && form.password.length < 7)
      errs.password = "Password must be at least 7 characters";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords must match";
    if (!form.name) errs.name = "Name is required";
    if (!form.age) errs.age = "Age is required";
    if (!form.region) errs.region = "Region is required";
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // TODO: check unique ID, call API/register logic
    const success = true; // placeholder
    if (success) navigate("/");
    else navigate("/error");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
            name="id"
            type="text"
            placeholder="ID"
            value={form.id}
            onChange={handleChange}
          />
          {errors.id && <span className="error">{errors.id}</span>}
          <input
            name="password"
            type="password"
            placeholder="パスワード"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <input
            name="confirmPassword"
            type="password"
            placeholder="確認用パスワード"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
          <input
            name="name"
            type="text"
            placeholder="名前"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <input
            name="age"
            type="number"
            placeholder="年齢"
            value={form.age}
            onChange={handleChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}
          <input
            name="region"
            type="text"
            placeholder="地域"
            value={form.region}
            onChange={handleChange}
          />
          {errors.region && <span className="error">{errors.region}</span>}
          <textarea
            name="bio"
            placeholder="自己紹介"
            value={form.bio}
            onChange={handleChange}
          />
          <input
            name="availability"
            type="text"
            placeholder="空いてる曜日と時間"
            value={form.availability}
            onChange={handleChange}
          />
          <input
            name="personality"
            type="text"
            placeholder="性格"
            value={form.personality}
            onChange={handleChange}
          />
          <input
            name="participants"
            type="number"
            placeholder="参加人数"
            value={form.participants}
            onChange={handleChange}
          />
          <button type="submit">登録</button>
        </form>
      </div>
      <footer className="auth-footer">
        <a href="/login">ログインへ戻る</a>
      </footer>
    </div>
  );
};

export default CreateAccountPage;
