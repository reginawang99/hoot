import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchResult from '../SearchResult';

import { SERVER_URL } from '../config';
import addContentSummary from '../utils/contentSummary'


function SectionFullListing() {
  const { query, section } = useParams();
  const decoded_section = section? decodeURIComponent(section): null;

  const [entries, setEntries] = useState([]);
  const isSearchingAll = decoded_section === "all" || decoded_section === null;


  useEffect(() => {
    setEntries([])

    let searchParams = {};
    if(!isSearchingAll)
      searchParams["section"] = decoded_section

    // so this is paginated 
    // so we will need to use recursion and keep checking if theres a next page
    // we are keeping an accumulator because even if we call setEntries
    let get_pages = (url, accum) => {
      axios.get(url, {
        params: searchParams
      }).then((response) => {
        const {results, next} = response.data;
        accum = accum.concat(results.map(addContentSummary))
        setEntries(accum) 
        if (next !== null) {
          setTimeout(() => get_pages(next, accum));
        }
      });
    
  }

  get_pages(`${SERVER_URL}/sg/entries/`, [])
  }, [decoded_section, isSearchingAll]);


 
  return (
    <div className="search-result-body">

      <div className="search-result-header">
        {decoded_section? decoded_section: "All"}
      </div>

      <div className="search-result-results">
        {
          // since the titles are unique, we can use it as a key
          entries.map((x) => <SearchResult term={x.title} entryID={x.id} contentSummary={x.contentSummary} key={x.title} />)
        }
      </div>
    </div>
  );
}

export default SectionFullListing;