import React, { useState, useEffect } from 'react';
import './style.css';
import SearchResult from "../SearchResult";
import {useParams} from 'react-router-dom';

import config from "../config";
import axios from "axios";

const { SERVER_URL } = config;
/**
* props = {
  header: header, 
  body: [
     {text: "asdf", link: "http://link.com"}
  ]
}
*/
function SearchResultsPanel () {
	const { query } = useParams();
	const [searchResults, setSearchResults] = useState(null);

	useEffect(() => {
	    axios.get(`${SERVER_URL}/sg/search/`, {
	      params: {
	      	query: query
	      }
	    }).then((response) => {
      		let modData = response.data;
        	//TODO: replace this with word truncater and markdown remover.
        	setSearchResults( modData.map(x => ({...x, contentSummary: x.content})))
	    })
	  }, [query]);

	if(searchResults === null)
		return <p> Loading ... </p>;


	const searchResultHeaderString = searchResults? `SEARCH RESULT${(searchResults.length === 1? "": "S")} (${searchResults.length})`: "";
	return (
		<div className="search-result-body">
	    
	      <div className="search-result-header"> 
	          {searchResultHeaderString}
	      </div>
	      
	      <div className="search-result-results">
	        {
	          searchResults.map(x =>  <SearchResult term={x.title} contentSummary={x.contentSummary} key={x.title}/>)
	        }
	      </div>
	    </div>
	);

}

export default SearchResultsPanel;