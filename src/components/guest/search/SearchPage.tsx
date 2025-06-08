import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetailPanel from "./UserDetailPanel";
import "./SearchPage.css";

interface User {
  name: string;
  age: string;
  region: string;
  intro: string;
  image: string;
  availability: string;
  personality: string;
  maxPeople: number;
}

const SearchPage: React.FC = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sentOffers, setSentOffers] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO fetch real data
    const mock: User[] = [
      {
        name: "山田 太郎",
        age: "28",
        region: "東京",
        intro: "お酒好きです",
        image: "",
        availability: "月・水・金 19:00-22:00",
        personality: "社交的",
        maxPeople: 4,
      },
      {
        name: "鈴木 花子",
        age: "32",
        region: "大阪",
        intro: "楽しく飲みたい",
        image: "",
        availability: "火・木 18:00-21:00",
        personality: "明るい",
        maxPeople: 3,
      },
    ];
    setResults(mock);
  };

  return (
    <div className="search-page">
      <h2>飲み友達検索</h2>
      <form className="search-area" onSubmit={handleSearch}>
        <div className="form-group">
          <label>年齢</label>
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="">全て</option>
            <option value="20-29">20〜29</option>
          </select>
        </div>
        <div className="form-group">
          <label>性別</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">全て</option>
            <option value="male">男性</option>
          </select>
        </div>
        <div className="form-group">
          <label>地域</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">全て</option>
            <option value="tokyo">東京</option>
          </select>
        </div>
        <button type="submit" className="search-button">
          <span>検索</span>
          <i className="material-icons">search</i>
        </button>
      </form>
      <div className="search-results">
        {results.length ? (
          <div className="results-grid">
            {results.map((user, idx) => (
              <div
                key={idx}
                className="card"
                onClick={() => setSelectedUser(user)}
              >
                <div className="card-image">
                  {user.image ? (
                    <img src={user.image} alt={user.name} />
                  ) : (
                    <i className="material-icons">person</i>
                  )}
                </div>
                <div className="card-content">
                  <h3>{user.name}</h3>
                  <p>
                    {user.age}歳・{user.region}
                  </p>
                  <p className="intro">{user.intro}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">検索結果なし</div>
        )}
      </div>
      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          isOffered={sentOffers.includes(selectedUser.name)}
          onClose={() => setSelectedUser(null)}
          onSendOffer={(msg: string) =>
            setSentOffers([...sentOffers, selectedUser.name])
          }
          onGoToChat={() => navigate("/chat")}
        />
      )}
    </div>
  );
};

export default SearchPage;
