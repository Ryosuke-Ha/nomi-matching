import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserDetailPanel from "../components/UserDetailPanel";
import "./SearchPage.css";
import { User } from "../../domain/models/User";
import { UserRepositoryFirebase } from "../../infrastructure/firebase/UserRepositoryFirebase";
import { SearchUsersUseCase } from "../../application/usecases/SearchUsersUseCase";
import { FetchAreasUseCase } from "../../../../shared/application/usecases/FetchAreasUseCase";
import { AreaRepositoryFirebase } from "../../../../shared/infrastructure/firebase/AreaRepositoryFirebase";

const SearchPage: React.FC = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sentOffers, setSentOffers] = useState<string[]>([]);
  const [areas, setAreas] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();
  const useCase = new SearchUsersUseCase(new UserRepositoryFirebase());

  useEffect(() => {
    const fetch = async () => {
      const useCase = new FetchAreasUseCase(new AreaRepositoryFirebase());
      const result = await useCase.execute();
      setAreas(result);
    };
    fetch().catch((err) => console.error("地域マスタの取得失敗:", err));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users = await useCase.execute(age, gender, region);
      // 地域IDを地域名に変換
      const enriched = users.map((u) => ({
        ...u,
        region: areas.find((a) => String(a.id) === region)?.name || u.region,
      }));
      setResults(enriched);
    } catch (err) {
      console.error("検索エラー:", err);
      setResults([]);
    }
  };

  return (
    <div className="search-page">
      <h2>SEARCH</h2>
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
