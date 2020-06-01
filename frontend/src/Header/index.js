import React, { useState, useEffect, useRef } from 'react';
import { Route, Link, useHistory, useParams} from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector, useDispatch } from 'react-redux'

import {encoded_history_push} from '../utils/urls.js'
import {search} from "../utils/search"
import { KEYBOARD_SHORTCUTS, executeAllShortcuts } from '../utils/keyboardShortcuts.js'
import "../App.css"



function searchOnEnter (history, currSection, setQuery, dispatch){
  // returns a function which is a closure on history, currSection and setQuery 
  return (e) => {
    executeAllShortcuts(e, setQuery, null) //we won't pass it the <input> tag because its already focused
    if (e.key === 'Enter') {
      const newQuery = e.target.value;
      search(history, newQuery, currSection)
    }
    
  }
}


function Header(props) {
  const [query, setQuery] = useState(''); // don't use setQuery directly, use setQueryAndRedux instead
  const queryInput = useRef(null);
  const history = useHistory();

  const currSection = useSelector(state => state.search.section)
  const dispatch = useDispatch()
  const setQueryAndRedux = (value) => {
    setQuery(value);
    dispatch({
      type: "SET_QUERY",
      payload: {
        query: value
      }  
  })}

  	  // this feels like this could be in a loop
  // but you can't use hooks inside a loop. 
  useHotkeys('ctrl+k', (e) => KEYBOARD_SHORTCUTS['ctrl+k'](e, setQueryAndRedux, queryInput));
  useHotkeys('command+k', (e) => KEYBOARD_SHORTCUTS['ctrl+k'](e, setQueryAndRedux, queryInput));

  useHotkeys('ctrl+l', (e) => KEYBOARD_SHORTCUTS['ctrl+l'](e, setQueryAndRedux, queryInput));
  useHotkeys('command+l', (e) => KEYBOARD_SHORTCUTS['ctrl+l'](e, setQueryAndRedux, queryInput));


	return (
		<div className="header">
	        <a className="help-button" href="/help"> <img  src="/helpbutton.svg"/> </a>
	        <a href="/" className="header-text">DAILY BRUIN STYLE GUIDE</a>
	        <div className="header-search-input-button-div">
	          <input 
	            className="header-search-input" 
	            type="text" 
	            ref={queryInput}
	            placeholder={currSection ? `searching ${currSection}` : "search here" }
	            value={query} 
	            onChange={(e)=>setQueryAndRedux(e.target.value)} 
	            onKeyDown={searchOnEnter(history, currSection, setQueryAndRedux, dispatch)}/>
	         <button className="header-search-button" onClick={() => search(history, query, currSection, dispatch)}><img src="/searchbutton.svg"/></button>
        	</div>
        </div>
	)
}

export default Header;