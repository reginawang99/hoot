import React, {useState} from 'react';
import './App.css';
import LinkPanel from './Panel/LinkPanel';
import SearchResultsPanel from './SearchResultsPanel';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SingleSearchResultView from './SingleSearchResultView';

import { SERVER_URL }  from "./config";
import axios from "axios";


/**
* This application is pretty simple. App is the root component and has all pretty much all of the states.
* The rest are functional components.
* App: root. Does axios and stuffs
*   Panel: Has different types of sidebar panels (currently only has LinkPanel and FilterPanel)
*   SearchResult: Functional componnent for displaying a single search result in the list of results
*   SearchResultsPanel: displays all search results and recommended
*   SingleSearchResultView: Shows a single search result which takes up the main panel. 
*
*/

function App () {
  const [query, setQuery] = useState("")

  return (
    <Router>
      <div className="App">
        <div className="header"> 
          <h1 className="header-text">DAILY BRUIN STYLE GUIDE</h1>
          <div>
            <input className="header-search-input" type="text" placeholder="search here" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Link className="header-search-button" to={`/search/all/${query}`}>S</Link>
          </div>
        </div>
        <div className="caw-body">
          <div className="search-result-container">
            
            <Route exact={true} path="/entry/:entryName" component={SingleSearchResultView} />
            <Route exact={true} path="/search/:sections/:query" component={SearchResultsPanel}/>
            
          </div>

          <div className="link-sidebar">
            <LinkPanel header="Sections" body={
              [
                {"text": "Design", "link": "http://link.com"},
                {"text": "Arts", "link": "http://link.com"},
                {"text": "News", "link": "http://link.com"},
                {"text": "Opinion", "link": "http://link.com"},
                {"text": "Sports", "link": "http://link.com"},
              ]
            }/>
            <LinkPanel header="Quick Links" body={
              [
                {"text": "asdf", "link": "http://link.com"},
                {"text": "another link", "link": "http://link.com"},
                {"text": "another link", "link": "http://link.com"},
                {"text": "another link", "link": "http://link.com"},
              ]
            }/>
            <LinkPanel header="Guides" body={
              [
                {"text": "Link1", "link": "http://link.com"},
                {"text": "Guide link", "link": "http://link.com"}
              ]
            }/>

          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;
