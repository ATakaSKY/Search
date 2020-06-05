import React, { useState } from "react";
import "./App.css";
import Results from "./components/Results";

import { processHackerNewsResults, processWikiResults } from "./util/util";
import { SearchSources } from "./util/constants";

function App() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, msg: "" });

  const [searchSource, setSearchSource] = useState(SearchSources[0].sourceUrl);

  const inputChangeHandler = e => {
    setTitle(e.target.value);
  };

  const sourceChangeHandler = e => {
    setSearchSource(e.target.value);
    setResults([]);
  };

  const searchHandler = async e => {
    e.preventDefault();
    if (!title.trim().length) {
      alert("Please insert title");
      return;
    }
    setLoading(true);

    let searchData;
    try {
      const searchResponse = await fetch(`${searchSource}${title}`);
      searchData = await searchResponse.json();
    } catch (err) {
      setLoading(false);
      setError({ status: true, msg: "Some error occurred." });
    }

    let results = [];
    if (searchSource === "https://hn.algolia.com/api/v1/search?query=") {
      try {
        results = await processHackerNewsResults(searchData);
      } catch (err) {
        setLoading(false);
        setError({ status: true, msg: "Some error occurred." });
      }
    } else if (
      searchSource ===
      "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search="
    ) {
      results = processWikiResults(searchData);
    }
    setLoading(false);
    setTitle("");
    setResults(results);
  };

  return (
    <div className="SearchApp">
      <div className="controls">
        <form onSubmit={searchHandler}>
          <div className="inputControl">
            <input
              type="text"
              value={title}
              name="title"
              onChange={inputChangeHandler}
            />
          </div>

          <div className="searchDropdownControl">
            <select value={searchSource} onChange={sourceChangeHandler}>
              {SearchSources.map(source => (
                <option key={source.id} value={source.sourceUrl}>
                  {source.sourceLabel}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="lds-hourglass"></div>
      ) : !error.status ? (
        <div className="results">
          {(!!results.length && <Results data={results} />) || (
            <div className="requestStatus">No results</div>
          )}
        </div>
      ) : (
        <div className="requestStatus">{error.msg}</div>
      )}
    </div>
  );
}

export default App;
