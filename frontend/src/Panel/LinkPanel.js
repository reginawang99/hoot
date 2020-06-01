import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, useHistory, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { KEYBOARD_SHORTCUTS, executeAllShortcuts } from '../utils/keyboardShortcuts.js'


import './style.css';


/*
* basically
*/
export function FunctionPanel(props) {
  const { header, body, callback } = props;
  const dispatch = useDispatch()
  const setQuery = (value) => {
    dispatch({
      type: "SET_QUERY",
      payload: {
        query: value
      }  
  })}

  

  return (
    <div className="link-panel">
      <div className="link-panel-header">
        {header}
      </div>
      <ul className="link-panel-list">
        <li key={-1}>
          <input onKeyDown={(e) => executeAllShortcuts(e, setQuery, props.queryInput) } type="radio" name="action"  onClick={() => callback([])}/>
          <label className="link-panel-link" for="track">All</label>
        </li>
        {body.map((x, index) => (
          <li key={index}>
            <input onKeyDown={(e) => executeAllShortcuts(e, setQuery, props.queryInput)} type="radio" name="action"  onClick={() => callback([x])}/>
            <label className="link-panel-link" for="track">{x.text}</label>
          </li>
        ))}
        
      </ul>
    </div>
  );
}

FunctionPanel.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })).isRequired,
  callback: PropTypes.func
};

export function LinkPanel(props) {
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


