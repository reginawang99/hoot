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
function Welcome() {
  return (
    <div className="search-result-body">

      <div className="search-result-header">
        Welcome to Daily Bruin Copy Style Guide
      </div>

      <div className="search-result-results">
        <p>Use the search bar above to find entries</p>
        <h3> Keyboard shortcuts </h3>
        <ul>
          <li>COMMAND+SHIFT+K/CONTROL+SHIFT+K Clear Search</li>
          <li>COMMAND+SHIFT+L/CONTROL+SHIFT+L Focus on Search input</li>
        </ul>
      </div>
    </div>
  );
}

export default Welcome;
