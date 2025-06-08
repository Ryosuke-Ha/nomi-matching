import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="form-container">
      <h2>ホーム</h2>
      <p>ようこそ、Nomi Matchingへ！</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/search">飲み友達検索</Link>
        </li>
        <li>
          <Link to="/invite">オファー送信</Link>
        </li>
        <li>
          <Link to="/reviews">レビュー</Link>
        </li>
        <li>
          <Link to="/payment">決済</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
