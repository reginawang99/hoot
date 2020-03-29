import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../config';


/**
* /entry/entry%20name
*/
function SingleEntryView() {
  const { entryName } = useParams();
  const decoded_entryName = decodeURIComponent(entryName)
  const [entry, setEntry] = useState(null);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    axios.get(`${SERVER_URL}/sg/entry/${decoded_entryName}`).then(({ data }) => {
      
      setEntry({
        title: data.title,
        content: data.content,
        section: data.section,
        tags: data.tags,
      });
    }).catch((error) => {
      setHasErrored(true);
    });
  }, [decoded_entryName]);

  if (hasErrored) {
    return (
      <p>
        {' '}
        Unable to find entry for &ldquo;
        {decoded_entryName}
        &rdquo;
      </p>
    );
  }

  if (entry === null) return <p> Loading... </p>;

  return (
    <div className="search-result-body">
      <div className="search-result-header-inverse">
        {entry.title}
      </div>
      <div className="search-result-results">
          <ReactMarkdown source={entry.content} />
      </div>
    </div>
  );
}

export default SingleEntryView;
