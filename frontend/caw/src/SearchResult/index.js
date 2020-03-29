import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';

/**
* props = {
  header: header, 
  body: [
     {text: "asdf", link: "http://link.com"}
  ]
}
*/
function SearchResult(props) {
	console.log(props.term);
	console.log(encodeURIComponent(props.term));
	return (<Link className="entry" to={`entry/${encodeURIComponent(props.term)}`}>
 		<span className="entry-term">{props.term}</span> {props.contentSummary}
    </Link>)
}

export default SearchResult;