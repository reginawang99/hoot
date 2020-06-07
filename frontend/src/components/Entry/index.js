import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown/with-html';

import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import {LightBoxImage, LightBoxModal} from "../LightBoxImage"
import '../App.css';




/**
* /entry/12
*/
function Entry() {
  const { entryID } = useParams();
  const [entry, setEntry] = useState(null);
  const [modalImageSrc, setModalImageSrc] = useState(null); //null means its closed, any string means its o
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${SERVER_URL}/sg/entry/${entryID}`).then(({ data }) => {
      
      setEntry({
        title: data.title,
        content: data.content,
        section: data.section,
        tags: data.tags,
      });
    }).catch((error) => {
      setHasErrored(true);
    });
  }, [entryID]);

  if (hasErrored) {
    return (
      <p>
        {' '}
        Unable to find entry for &ldquo;
        {entryID}
        &rdquo;
      </p>
    );
  }

  if (entry === null) return <p> Loading... </p>;

  return (
    <div className="search-result-body">
      <LightBoxModal open={modalImageSrc !== null} onClick={setModalImageSrc} src={modalImageSrc}/>
      <div className="search-result-header-inverse">
        {entry.title}
      </div>
      <div className="search-result-results">
          <ReactMarkdown 
            escapeHtml={false} 
            source={entry.content}
            renderers={{
              image: (props) => <LightBoxImage {...props} onClick={setModalImageSrc}/>
            }} />
      </div>
    </div>
  );
}

export default Entry;
