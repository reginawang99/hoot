import React from 'react';
import './style.css';

/**
* props = {
  header: header, 
  body: [
     {text: "asdf", link: "http://link.com"}
  ]
}
*/
function LinkPanel(props) {
	return (<div className="link-panel">
	   <div className="link-panel-header"> {props.header}</div>
	    <ul className="link-panel-list">
		   {props.body.map(x => (<li><a className="link-panel-link" href={x.link}>{x.text}</a></li>))}
		</ul>
	</div>)
}

export default LinkPanel;