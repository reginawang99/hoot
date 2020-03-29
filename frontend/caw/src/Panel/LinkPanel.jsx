import React from 'react';
import './style.css';
import PropTypes from 'prop-types';


/*
* basically
*/
export function FunctionPanel(props) {
  const { header, body, callback } = props;
  return (
    <div className="link-panel">
      <div className="link-panel-header">
        {header}
      </div>
      <ul className="link-panel-list">
        {body.map((x, index) => (
          <li key={index}>
            <a className="link-panel-link" onClick={() => callback(x)}>{x.text}</a>
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


