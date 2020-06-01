import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Link, useHistory, useParams} from 'react-router-dom';



import { useOnetimeAPIFetch } from '../utils/api.js'
import { SERVER_URL } from '../config';
import {LinkPanel, FunctionPanel} from '../Panel/LinkPanel';
import {encoded_history_push} from '../utils/urls.js'


import "../App.css"

function search(history, query, currSection){
  let sectionString;
  if(currSection === null)
    sectionString = "all";
  else
    sectionString = currSection

  // Note: we cannot use `/${sectionString}/${query}`
  // it does not encode url characters 
  if(query != null)
    encoded_history_push(history, '/search/{sectionString}/{query}', {
      sectionString: sectionString,
      query: query 
    })
  else
    encoded_history_push(history, '/search/{sectionString}/', {
      sectionString: sectionString,
    })
}


// the following functions are curried
// woah cs 131 EgErT
function onSectionPanelClick (dispatch, query, history){
  return (x) => { // x is passed by FunctionPanel. its an array of what has been selected
    let newSection;
    if(x.length === 0){
      // we are selecting no sections
      newSection = null
    } else {
      newSection = x[0].text; // for now we can only filter by one section
    }

    dispatch({
      type: "SET_SECTION",
      payload: {
        section: newSection
      }  
    })

    search(history, query, newSection)
  }
}


function Sidebar(){

	const sections = useOnetimeAPIFetch(`${SERVER_URL}/sg/sections`, []);
	const quickLinks = useOnetimeAPIFetch(`${SERVER_URL}/sg/quick-links`, []);
	const guides = useOnetimeAPIFetch(`${SERVER_URL}/sg/guides`, []);
	const dispatch = useDispatch()
  const history = useHistory();
  const query = useSelector(state => state.search.query)


	return (
		<div className="link-sidebar">
          <FunctionPanel
            header="Sections"
            body={sections.map(x => ({...x, text: x.name}))}
            callback={onSectionPanelClick(dispatch, query, history)}
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
     )
}

export default Sidebar;