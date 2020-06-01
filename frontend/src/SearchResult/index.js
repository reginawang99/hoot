import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdownWithHTML from 'react-markdown/with-html';
import ReactMarkdown from 'react-markdown';



function SearchResult(props) {
  return (
    <Link className="entry" to={`/entry/${props.entryID}`}>
      <span className="entry-term">{props.term}</span>
      {props.omitSummary?
      	null:
      	<ReactMarkdown escapeHtml={false} source={props.contentSummary} />
      }
    </Link>
  );
}


SearchResult.propTypes = {
  term: PropTypes.string.isRequired,
  contentSummary: PropTypes.string.isRequired,
  entryID: PropTypes.number.isRequired
};

export default SearchResult;
