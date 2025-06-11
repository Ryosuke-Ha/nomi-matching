import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import UserDetailPanel from "./UserDetailPanel";
import "./SearchPage.css";
import { db } from "../../../firebaseConfig";

interface User {
  name: string;
  age: string;
  region: string;
  intro: string;
  image: string;
  availableDays: number[];
  availableTimeStart: number;
  availableTimeEnd: number;
  personality: string;
  maxPeople: number;
  gender: string;
}

const SearchPage: React.FC = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sentOffers, setSentOffers] = useState<string[]>([]);
  const [areas, setAreas] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    db.collection("areaMst")
      .get()
      .then((snapshot) => {
        const list = snapshot.docs.map(
          (doc) => doc.data() as { id: number; name: string }
        );
        setAreas(list);
      })
      .catch((err) => console.error("Error fetching areas:", err));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Build query on userProfiles
      let query: firebase.firestore.Query<firebase.firestore.DocumentData> =
        db.collection("userProfiles");
      if (age) {
        const [min, max] = age.split("-").map(Number);
        query = query.where("age", ">=", min).where("age", "<=", max);
      }
      if (gender) {
        const genderNum = Number.parseInt(gender);
        query = query.where("gender", "==", genderNum);
      }
      if (region) {
        query = query.where("area", "==", Number(region));
      }
      const profileSnap = await query.get();

      // Map profiles with optional account join
      const users: User[] = await Promise.all(
        profileSnap.docs.map(async (doc) => {
          const p = doc.data();
          return {
            name: p.name,
            age: String(p.age),
            region: areas.filter((a) => a.id === p.area)[0]?.name || "",
            intro: p.intro,
            image: p.imageURL || "",
            availableDays: p.availableDays,
            availableTimeStart: p.availableTimeStart,
            availableTimeEnd: p.availableTimeEnd,
            personality: p.personality,
            maxPeople: p.partySize,
            gender: convertGender(p.gender),
          };
        })
      );

      setResults(users);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setResults([]);
    }
  };

  const convertGender = (gender: number): string => {
    switch (gender) {
      case 1:
        return "男性";
      case 2:
        return "女性";
      case 3:
        return "その他";
      default:
        return "";
    }
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
            <option value="30-39">30〜39</option>
            <option value="40-49">40〜49</option>
            <option value="50-59">50〜59</option>
            <option value="60-69">60〜69</option>
          </select>
        </div>
        <div className="form-group">
          <label>性別</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">全て</option>
            <option value="1">男性</option>
            <option value="2">女性</option>
            <option value="3">その他</option>
          </select>
        </div>
        <div className="form-group">
          <label>地域</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">全て</option>
            {areas.map((a) => (
              <option key={a.id} value={String(a.id)}>
                {a.name}
              </option>
            ))}
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
                    {user.gender}・{user.age}歳・{user.region}
                  </p>
                  <p className="intro">{user.intro}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">検索条件を指定してください</div>
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
