import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';


/**
* props = {
  header: header,
  body: [
     {text: "asdf", link: "http://link.com"}
  ]
}
*/
function SectionHome() {
  const { section } = useParams();
  const dSection = decodeURIComponent(section)

  return (
    <div className="search-result-body">

      <div className="search-result-header">
        {dSection}
      </div>

      <div className="search-result-results">
        { dSection === "all" ? 
        <p>Search results will be from all sections </p> :
        <p>Search results will exclusively for {dSection}.</p>
        }
        
      </div>
    </div>
  );
}

export default SectionHome;
