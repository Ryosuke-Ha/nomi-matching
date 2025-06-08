import React, { useState } from "react";

const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<string[]>([]);
  const [newReview, setNewReview] = useState("");

  const handleAdd = () => {
    if (newReview.trim()) {
      setReviews((prev) => [newReview.trim(), ...prev]);
      setNewReview("");
    }
  };

  return (
    <div className="form-container">
      <h2>レビュー</h2>
      <div className="form-group">
        <textarea
          rows={3}
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="レビューを入力"
        />
      </div>
      <button type="button" onClick={handleAdd}>
        投稿
      </button>
      <div className="search-results">
        {reviews.map((r, i) => (
          <div key={i} className="form-group">
            {r}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
