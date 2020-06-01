import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';



function SearchResult(props) {
  return (
    <Link className="entry" to={`/entry/${props.entryID}`}>
      <span className="entry-term">{props.term}</span>
      <ReactMarkdown escapeHtml={false} source={props.contentSummary} />
    </Link>
  );
}


SearchResult.propTypes = {
  term: PropTypes.string.isRequired,
  contentSummary: PropTypes.string.isRequired,
  entryID: PropTypes.number.isRequired
};

export default SearchResult;
