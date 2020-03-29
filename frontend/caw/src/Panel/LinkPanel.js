import React from 'react';
import './style.css';
import PropTypes from 'prop-types';


function LinkPanel(props) {
	return (<div className="link-panel">
	   <div className="link-panel-header"> {props.header}</div>
	    <ul className="link-panel-list">
		   {props.body.map(x => (<li key={x.text}>
		   		<a className="link-panel-link" href={x.link}>{x.text}</a>
		   	</li>))}
		</ul>
	</div>)
}

LinkPanel.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.array.isRequired
};

export default LinkPanel;