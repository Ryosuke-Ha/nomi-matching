import React, { useState } from "react";

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Fetch search results from API
    setResults([`Result for "${query}" #1`, `Result for "${query}" #2`]);
  };

  return (
    <div className="form-container">
      <h2>検索</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>キーワード</label>
          <input
            type="text"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索ワードを入力"
          />
        </div>
        <button type="submit">検索</button>
      </form>
      <div className="search-results">
        {results.map((item, idx) => (
          <div key={idx} className="form-group">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
