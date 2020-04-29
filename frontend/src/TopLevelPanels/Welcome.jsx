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
        <table className="shortcuts-table">
          <tr className="header">
            <th>Action</th>
            <th>Windows</th> 
            <th>Mac</th>
          </tr>
          <tr>
            <td>Focus on search input</td>
            <td>Control L</td>
            <td>⌘L</td>
          </tr>
          <tr>
            <td>Clear query</td>
            <td>Control K</td>
            <td>⌘K</td>
          </tr>
          <tr>
            <td>Search</td>
            <td>Enter</td>
            <td>Enter</td>
          </tr>
        </table>
        
      </div>
    </div>
  );
}

export default Welcome;
