import React, { useState, useEffect } from 'react';
import {  useHistory,} from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector, useDispatch } from 'react-redux'

import {search} from "../../utils/search"
import { KEYBOARD_SHORTCUTS, executeAllShortcuts } from '../../utils/keyboardShortcuts.js'
import "../App.css"



function searchOnEnter (history, currSection, setQuery){
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
  // unfortunately, react warns that an uncontrolled input is controlled 
  // if we set it using redux directly.
  const [query, setQuery] = useState(''); // don't use setQuery directly, use setQueryAndRedux instead
  const history = useHistory();

  const currSection = useSelector(state => state.search.section)
  const actualQuery = useSelector(state => state.search.query)
  const dispatch = useDispatch()
  const setQueryAndRedux = (value) => {
    setQuery(value); // set local state
    dispatch({ // set redux state
      type: "SET_QUERY",
      payload: {
        query: value
      }  
  })}

  useEffect( () => {
    setQuery(actualQuery);
  }, [actualQuery])

  // this feels like this could be in a loop
  // but you can't use hooks inside a loop. 
  useHotkeys('ctrl+k', (e) => KEYBOARD_SHORTCUTS['ctrl+k'](e, setQueryAndRedux, props.queryInput));
  useHotkeys('command+k', (e) => KEYBOARD_SHORTCUTS['ctrl+k'](e, setQueryAndRedux, props.queryInput));

  useHotkeys('ctrl+l', (e) => KEYBOARD_SHORTCUTS['ctrl+l'](e, setQueryAndRedux, props.queryInput));
  useHotkeys('command+l', (e) => KEYBOARD_SHORTCUTS['ctrl+l'](e, setQueryAndRedux, props.queryInput));


	return (
		<div className="header">
	        <a className="help-button" href="/help"> <img alt="help" src="/helpbutton.svg"/> </a>
          
	        <a href="/" className="header-text">
            <img alt="Hoot Logo" className="hoot-logo" src="/hoot-03.svg"/>
          </a>
	        <div className="header-search-input-button-div">
	          <input 
	            className="header-search-input" 
	            type="text" 
	            ref={props.queryInput}
	            placeholder={currSection ? `searching ${currSection}` : "search here" }
	            value={query} 
	            onChange={(e)=>setQueryAndRedux(e.target.value)} 
	            onKeyDown={searchOnEnter(history, currSection, setQueryAndRedux)}/>
	         <button className="header-search-button" onClick={() => search(history, query, currSection)}><img alt="search" src="/searchbutton.svg"/></button>
        	</div>
        </div>
	)
}

export default Header;