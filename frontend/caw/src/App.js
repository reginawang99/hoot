import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';


import './App.css';
import {LinkPanel, FunctionPanel} from './Panel/LinkPanel';
import SearchResultsPanel from './SearchResultsPanel';
import SingleSearchResultView from './SingleSearchResultView';
import { SERVER_URL } from './config';
import axios from 'axios';




/**
* This application is pretty simple. TODO update this
*/
function useOnetimeAPIFetch(url, initial) {  
  const [data, setData] = useState(initial);

  useEffect(() => {
    axios.get(url).then(result => {
      console.log(result)
      setData(result.data)
    }).catch((error) => {
      //TODO
      console.log("error!" + error)
    });
  }, [url]); //will only run again if the url changes

  return data;
}

function search(history, query, currSection){
  history.push(`/search/all/${query}`)
}

function searchOnEnter (history, currSection){ 
  return (e) => {
    if (e.key === 'Enter') {
      const newQuery = e.target.value;
      search(history, newQuery, currSection)
    }
  }
}


function App() {
  const history = useHistory();

  const [query, setQuery] = useState('');
  //represents which section we are searching
  //null means that we are using all section
  const [currSection, setCurrSection] = useState(null); 
  const sections = useOnetimeAPIFetch(`${SERVER_URL}/sg/sections`, []);
  const quickLinks = useOnetimeAPIFetch(`${SERVER_URL}/sg/quick-links`, []);
  const guides = useOnetimeAPIFetch(`${SERVER_URL}/sg/guides`, []);
  

  console.log("startign");
  console.log(guides);

  return (
    
      <div className="App">
        <div className="header">
          <h1 className="header-text">DAILY BRUIN STYLE GUIDE</h1>
          <div>
            <input 
              className="header-search-input" 
              type="text" 
              placeholder="search here" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              onKeyDown={searchOnEnter(history, currSection)}/>
            <Link className="header-search-button" to={`/search/all/${query}`}>S</Link>
          </div>
        </div>
        <div className="caw-body">
          <div className="search-result-container">

            <Route exact path="/entry/:entryName" component={SingleSearchResultView} />
            <Route exact path="/search/:sections/:query" component={SearchResultsPanel} />

          </div>

          <div className="link-sidebar">
            <FunctionPanel
              header="Sections"
              body={sections.map(x => ({...x, text: x.name}))}
              callback={console.log}
            />
            <LinkPanel
              header="Quick Links"
              body={quickLinks}
            />
            <LinkPanel
              header="Guides"
              body={guides}
            />

          </div>
        </div>
      </div>
    
  );
}


export default App;
