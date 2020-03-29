import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../config';


/**
* /entry/entry%20name
*/
function SingleSearchResultView() {
  const { entryName } = useParams();
  const [entry, setEntry] = useState(null);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
        axios.get(`${SERVER_URL}/sg/entry/${entryName}`).then(({ data }) => {
      console.log(data);
      setEntry({
        title: data.title,
        content: data.content,
        section: data.section,
        tags: data.tags,
      });
    }).catch((error) => {
      setHasErrored(true);
    });
      }, [entryName]);

  if (hasErrored) {
    return (
      <p>
        {' '}
        Unable to find entry for &ldquo;
        {entryName}
        &rdquo;
      </p>
    );
  }

  if (entry === null) return <p> Loading... </p>;

  return (
    <div>
      <h1>
        {' '}
        {entry.title}
        {' '}
      </h1>
      <ReactMarkdown source={entry.content} />
    </div>
  );
}

export default SingleSearchResultView;
