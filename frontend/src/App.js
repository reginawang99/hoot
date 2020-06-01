import React, { useState, useEffect, useRef } from 'react';
import { Route, Link, useHistory, useParams} from 'react-router-dom';


import './App.css';
import {LinkPanel, FunctionPanel} from './Panel/LinkPanel';
import Help from './TopLevelPanels/Help'
import Header from "./Header"
import Sidebar from "./Sidebar"
import SearchResultsPanel from './TopLevelPanels/SearchResultsPanel';
import SingleEntryView from './TopLevelPanels/SingleEntryView';
import SectionFullListing from "./TopLevelPanels/SectionFullListing"
import { SERVER_URL } from './config';
import axios from 'axios';

import { useHotkeys } from 'react-hotkeys-hook';
import { useOnetimeAPIFetch } from './utils/api.js'
import { KEYBOARD_SHORTCUTS, executeAllShortcuts } from './utils/keyboardShortcuts.js'
import {encoded_history_push} from './utils/urls.js'




function onSectionPanelClick (setCurrSection){
  return (x) => { // x is passed by FunctionPanel. its an array of what has been selected
    let newSection;
    if(x.length === 0){
      // we are selecting no sections
      newSection = null
    } else {
      newSection = x[0].text; // for now we can only filter by one section
    }

    setCurrSection(newSection)
  }
}

/*
* Root component
*  Every single page has the search bar and the sidebar
*  there is a react router switch for the body of the page. it displays:
*     * Welcome page       TODO: rename to Welcome
*     * Section Home       TODO: rename to Section Landing
*     * SingleEntryView    TODO: rename Entry
*     * SearchResultsPanel TODO: rename to SearchResults
*  all of these components are found in TopLevelPanels (TODO: rename to AppBody)
* 
* 
* One source of Truth (urls):
*  All of the data for searching is stored in the URL, not local state.
*  So that people can copy urls to searches or entries in the style guide
*  It also simplifies code cuz truth comes from one source (hehe redux philosophy)
*
*  Since everything is in urls, we must encode all weird characters 
*  https://www.w3schools.com/html/html_urlencode.asp
* 
*  When we fetch data from urls, we must decode the urls.

TODO: do we need index.css
TODO: make utils folder with URL stuff, keyboard shortcuts, etc
*/

function App() {
  const history = useHistory();

  //represents which section we are searching
  //null means that we are using all section
  const [currSection, setCurrSection] = useState(null); 
  const sections = useOnetimeAPIFetch(`${SERVER_URL}/sg/sections`, []);
  const quickLinks = useOnetimeAPIFetch(`${SERVER_URL}/sg/quick-links`, []);
  const guides = useOnetimeAPIFetch(`${SERVER_URL}/sg/guides`, []);




  return (
    
        <div className="App">
          <Header/>
          <div className="caw-body">
            <div className="search-result-container">
              <Route exact path="/" component={SectionFullListing} />
              <Route exact path="/entry/:entryID" component={SingleEntryView} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/search/:section" component={SectionFullListing} />
              <Route exact path="/search/:section/:query" component={SearchResultsPanel} />

            </div>

            <Sidebar/>
          </div>
        </div>
      

  );
}


export default App;
