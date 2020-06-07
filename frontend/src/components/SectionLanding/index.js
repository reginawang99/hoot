import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import SearchResultRow from '../SearchResultRow';

import { SERVER_URL } from '../../config';
import addContentSummary from '../../utils/contentSummary'


function SectionLanding() {
  const { section } = useParams();
  const decoded_section = section? decodeURIComponent(section): "all";
  const [entries, setEntries] = useState([]);
  const isSearchingAll = decoded_section === "all";
  const location = useLocation();

  useEffect(() => {
    setEntries([])
    let isUnmounted = false

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
        if(!isUnmounted){
          setEntries(accum) 
          if (next !== null) {
            get_pages(next, accum);
          }
        }
      });
      
    }

    get_pages(`${SERVER_URL}/sg/entries/`, [])
    return () => {isUnmounted=true};
  }, [decoded_section, isSearchingAll]);


 
  return (
    <div className="search-result-body">

      <div className="search-result-header">
        {decoded_section !== "all"? decoded_section: "All"}
      </div>

      <div className="search-result-results">
        {
          // since the titles are unique, we can use it as a key
          entries.map((x) => <SearchResultRow omitSummary={true} term={x.title} entryID={x.id} contentSummary={x.contentSummary} key={x.title} />)
        }
      </div>
    </div>
  );
}

export default SectionLanding;