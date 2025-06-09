import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import bcrypt from "bcryptjs";
import "./SignupPage.css";

type FormData = {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: string;
  region: string;
  bio: string;
  availability: string;
  personality: string;
  participants: string;
};

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
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
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [areas, setAreas] = useState<{ id: number; name: string }[]>([]);

  const validateStep = (current: number) => {
    const errs: Partial<FormData> = {};
    if (current === 1) {
      if (!form.id) errs.id = "ID is required";
      if (!form.password) errs.password = "Password is required";
      if (!form.confirmPassword)
        errs.confirmPassword = "Confirm password is required";
      if (form.password && form.password.length < 7)
        errs.password = "Min 7 characters";
      if (form.password !== form.confirmPassword)
        errs.confirmPassword = "Passwords must match";
    } else if (current === 2) {
      if (!form.name) errs.name = "Name is required";
      if (!form.age) errs.age = "Age is required";
      if (!form.region) errs.region = "Region is required";
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep(step);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setErrors({});
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const uid = form.id; // TODO: replace with real Auth UID
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(form.password, salt);
    await db.collection("accounts").doc(uid).set({
      uid,
      email: form.id,
      passwordHash,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    await db
      .collection("userProfiles")
      .doc(uid)
      .set({
        uid,
        name: form.name,
        age: Number(form.age),
        gender: 1, // TODO: wire actual gender input
        area: Number(form.region),
        intro: form.bio,
        availableDays: [], // TODO: map availability days
        availableTimeStart: 0, // TODO: parse time start
        availableTimeEnd: 0, // TODO: parse time end
        personality: form.personality,
        partySize: Number(form.participants),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    navigate("/");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors(validateStep(step));
  };

  useEffect(() => {
    (async () => {
      const snapshot = await db.collection("areaMst").get();
      setAreas(
        snapshot.docs.map((doc) => doc.data() as { id: number; name: string })
      );
    })();
  }, []);

  return (
    <div className="auth-container">
      <header className="auth-header">
        <i className="material-icons beer-icon">local_drink</i>
        <h1>nomi-matching</h1>
      </header>
      <div className="auth-card">
        {step === 1 && (
          <div className="step">
            <label htmlFor="id">
              ID <span className="required">必須</span>
              <input
                id="id"
                name="id"
                placeholder="ID"
                value={form.id}
                onChange={handleChange}
              />
            </label>
            <span className="error-message">{errors.id || ""}</span>
            <label htmlFor="password">
              パスワード <span className="required">必須</span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="パスワード"
                value={form.password}
                onChange={handleChange}
              />
            </label>
            <span className="error-message">{errors.password || ""}</span>
            <label htmlFor="confirmPassword">
              確認用パスワード <span className="required">必須</span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="確認用パスワード"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </label>
            <span className="error-message">
              {errors.confirmPassword || ""}
            </span>
            <button onClick={handleNext}>次へ</button>
          </div>
        )}
        {step === 2 && (
          <div className="step">
            <label htmlFor="name">
              名前 <span className="required">必須</span>
              <input
                id="name"
                name="name"
                placeholder="名前"
                value={form.name}
                onChange={handleChange}
              />
            </label>
            <span className="error-message">{errors.name || ""}</span>
            <label htmlFor="age">
              年齢 <span className="required">必須</span>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="年齢"
                value={form.age}
                onChange={handleChange}
              />
            </label>
            <span className="error-message">{errors.age || ""}</span>
            <label htmlFor="region">
              地域 <span className="required">必須</span>
              <select
                id="region"
                name="region"
                value={form.region}
                onChange={handleChange}
              >
                <option value="">地域を選択</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id.toString()}>
                    {area.name}
                  </option>
                ))}
              </select>
            </label>
            <span className="error-message">{errors.region || ""}</span>
            <div className="button-group">
              <button onClick={handleBack}>戻る</button>
              <button onClick={handleNext}>次へ</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <form className="step" onSubmit={handleSubmit}>
            <label htmlFor="availability">
              空いてる曜日と時間
              <input
                id="availability"
                name="availability"
                placeholder="空いてる曜日と時間"
                value={form.availability}
                onChange={handleChange}
              />
            </label>
            <span className="error-message">{errors.availability || ""}</span>
            <label htmlFor="personality">
              性格
              <input
                id="personality"
                name="personality"
                placeholder="性格"
                value={form.personality}
                onChange={handleChange}
              />
            </label>
            <span className="error-message">{errors.personality || ""}</span>
            <label htmlFor="participants">
              参加人数
              <input
                id="participants"
                name="participants"
                type="number"
                placeholder="参加人数"
                value={form.participants}
                onChange={handleChange}
              />
            </label>
            <span className="error-message">{errors.participants || ""}</span>
            <div className="button-group">
              <button type="button" onClick={handleBack}>
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
