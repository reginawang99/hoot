import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import SearchResult from '../SearchResult';

import { SERVER_URL } from '../config';
import addContentSummary from '../utils/contentSummary'

function results_string(results){
  if (results === null)
    return "";
  if (results.length === 1)
    return "1 RESULT";
  return `${results.length} RESULTS`
}

function useUrlSearchParams() {
  return new URLSearchParams(useLocation().search);
}


function SearchResultsPanel() {
  const { section } = useParams();
  const urlSearchParams = useUrlSearchParams();
  const query = urlSearchParams.get("query")
  const decoded_section = section? decodeURIComponent(section): null

  const [searchResults, setSearchResults] = useState(null);
  const [recommendedResults, setRecommenedResults] = useState(null);
  const isSearchingAll = decoded_section === "all" || decoded_section === null;

  useEffect(() => {
    setSearchResults(null)
    setRecommenedResults(null)

    let searchParams = {};
    if(query !== null)
      searchParams['query'] = query
    if(!isSearchingAll)
      searchParams["section"] = decoded_section

    axios.get(`${SERVER_URL}/sg/search/`, {
      params: searchParams
    }).then((response) => {
        const modData = response.data.map(addContentSummary);
        setSearchResults(modData);
        // the recommended search will execute after the normal search
        // this is because this query is more intense
        axios.get(`${SERVER_URL}/sg/recommended-search-results`, {
          params: searchParams
        }).then((response) => {
          const modData = response.data.map(addContentSummary);
          setRecommenedResults(modData)

        })
    });
  }, [query, decoded_section, isSearchingAll]);

  if (searchResults === null) return <p> Loading ... </p>;

 

  let searchResultHeaderString;
  if(isSearchingAll)
    searchResultHeaderString = searchResults ? `SEARCH (${results_string(searchResults)})` : '';
  else
    searchResultHeaderString = decoded_section + `  (${results_string(searchResults)})`

  return (
    <div className="search-result-body">

      <div className="search-result-header">
        {searchResultHeaderString}
      </div>

      <div className="search-result-results">
        {
          searchResults.map((x, index) => <SearchResult term={x.title} entryID={x.id} contentSummary={x.contentSummary} key={index} />)
        }
      </div>
      <div className="search-result-header-wo-border">
          RECOMMENDED ({results_string(recommendedResults)})
        </div>
      <div className="search-result-results">
        {
          recommendedResults?
          recommendedResults.map((x, index) => <SearchResult term={x.title} entryID={x.id} contentSummary={x.contentSummary} key={index} />): null
        }
      </div>
    </div>
  );
  
}

export default SearchResultsPanel;
