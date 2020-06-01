import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
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

/**
* Ok this is going to be a complicated component
* If a query and a section is provided, it will search using those two
   Note: section = "all" => all sections
* If no query is provided, then it will show all results for the given section
* if no query and no section is provided, then it will show ALL entries

}
*/
function SearchResultsPanel() {
  const { query, section } = useParams();
  const decoded_query = decodeURIComponent(query)
  const decoded_section = decodeURIComponent(section)

  const [searchResults, setSearchResults] = useState(null);
  const [recommendedResults, setRecommenedResults] = useState(null);
  const isSearchingAll = decoded_section === "all" || section === undefined;

  useEffect(() => {
    setSearchResults(null)
    setRecommenedResults(null)

    let searchParams = {};
    if(query !== undefined)
      searchParams['query'] = decoded_query
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
  }, [decoded_query, decoded_section, isSearchingAll]);

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
