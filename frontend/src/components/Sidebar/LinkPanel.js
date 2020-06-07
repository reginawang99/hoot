import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, useHistory, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { KEYBOARD_SHORTCUTS, executeAllShortcuts } from '../../utils/keyboardShortcuts.js'


import './style.css';


/**
* Quick Links
* Guides
*/

export default function LinkPanel(props) {
  const { header, body } = props;
  return (
    <div className="link-panel">
      <div className="link-panel-header">
        {header}
      </div>
      <ul className="link-panel-list">
        {body.map((x, index) => (
          <li key={index}>
            <a className="link-panel-link" target="_blank" rel="noopener noreferrer" href={x.url}>{x.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

LinkPanel.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};


