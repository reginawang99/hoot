import React from 'react';
import { useParams } from 'react-router-dom';
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
  const { section } = useParams();

  return (
    <div className="search-result-body">

      <div className="search-result-header">
        {section}
      </div>

      <div className="search-result-results">
        <p>Searches results will exclusively {section}.</p>
        
      </div>
    </div>
  );
}

export default Welcome;
