import React, { useRef } from 'react';
import { Route} from 'react-router-dom';
import {  useDispatch } from 'react-redux'


import './App.css';
import Help from './Help'
import Header from "./Header"
import Sidebar from "./Sidebar"
import SearchResults from './SearchResults';
import Entry from './Entry';
import SectionLanding from "./SectionLanding"
import {  executeAllShortcuts } from '../utils/keyboardShortcuts.js'






/*
Hoot has two sources of truth:
  SectionLanding/SearchResults: URL params from react router
  Header/Sidebar: Redux state 
 
Whenever we want to make a new search, we must flush the Redux state section and query into the url.

Based on the url react router decides whether to load SectionLanding or SearchResults. 
The former lists everything; the later shows search results

Flow charts: 
 * change search query input -> change redux state
 * press enter -> change url -> re render results page
 * click section -> change redux -> change url -> re render results page
*/

function App() {

  // used by keyboardShortcutsInterceptor
  const dispatch = useDispatch()
  const setQuery = (value) => {
    dispatch({
      type: "SET_QUERY",
      payload: {
        query: value
      }  
  })}

  // set by header to be the search input
  const queryInput = useRef(null);

  // when an input tag is focused, keyboard shortcuts won't work
  // so for example, the radio buttons for selecting the section won't work
  // so we have to pass this function to onKeyDown for the radio buttons
  const keyboardShortcutsInterceptor = (e) => executeAllShortcuts(e, setQuery, queryInput)

  return (
    
        <div className="App">
          <Header queryInput={queryInput}/>
          <div className="caw-body">
            <div className="search-result-container">
              <Route exact path="/" component={SectionLanding} />
              <Route exact path="/entry/:entryID" component={Entry} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/search/:section" component={SectionLanding} />
              <Route exact path="/search/:section/search" component={SearchResults} />

            </div>

            <Sidebar 
              keyboardShortcutsInterceptor={keyboardShortcutsInterceptor} 
            />
          </div>
        </div>
      

  );
}


export default App;
