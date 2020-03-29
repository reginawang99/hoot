import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchResult from '../SearchResult';

import { SERVER_URL } from '../config';

/**
* props = {
  header: header,
  body: [
     {text: "asdf", link: "http://link.com"}
  ]
}
*/
function SearchResultsPanel() {
  const { query, section } = useParams();
  const [searchResults, setSearchResults] = useState(null);
  const isFilteringToSection = section === "all";

  useEffect(() => {
    axios.get(`${SERVER_URL}/sg/search/`, {
      params: {
        query,
      },
    }).then((response) => {
        const modData = response.data.map((x) => ({ ...x, contentSummary: x.content }));
        // TODO: replace this with word truncater and markdown remover.
        console.log(modData)
        setSearchResults(modData);
    });
  }, [query]);

  if (searchResults === null) return <p> Loading ... </p>;

 

  let searchResultHeaderString;
  let num_results_as_string = `${searchResults.length} RESULT${(searchResults.length === 1 ? '' : 'S')}`
  if(isFilteringToSection)
    searchResultHeaderString = searchResults ? `SEARCH (${num_results_as_string})` : '';
  else
    searchResultHeaderString = section + `  (${num_results_as_string})`

  return (
    <div className="search-result-body">

      <div className="search-result-header">
        {searchResultHeaderString}
      </div>

      <div className="search-result-results">
        {
              searchResults.map((x, index) => <SearchResult term={x.title} contentSummary={x.contentSummary} key={index} />)
            }
      </div>
    </div>
  );
}

export default SearchResultsPanel;
