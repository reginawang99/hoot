import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';



function SearchResult(props) {
	console.log(props.term);
	console.log(encodeURIComponent(props.term));
	return (<Link className="entry" to={`/entry/${encodeURIComponent(props.term)}`}>
 		<span className="entry-term">{props.term}</span> {props.contentSummary}
    </Link>)
}


SearchResult.propTypes = {
  term: PropTypes.string.isRequired,
  contentSummary: PropTypes.string.isRequired
};

export default SearchResult;