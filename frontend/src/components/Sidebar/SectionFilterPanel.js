import React from 'react';
import {  useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import {search} from "../../utils/search"
import { useOnetimeAPIFetch } from '../../utils/api.js'
import { SERVER_URL } from '../../config';


import './style.css';



function SectionRadioButton(props) {
  return (<li>
    <input 
        onKeyDown={props.keyboardShortcutsInterceptor} 
        type="radio" 
        name="action"  
        id={props.section}
        onClick={props.onClickFunction}/>
    <label className="link-panel-link">{props.section}</label> 
  </li>)
}

export default function SectionFilterPanel(props) {
  const sections = useOnetimeAPIFetch(`${SERVER_URL}/sg/sections`, []);

  const dispatch = useDispatch()
  const history = useHistory();
  const query = useSelector(state => state.search.query)

  const setSection = (newSection) => {
    dispatch({
      type: "SET_SECTION",
      payload: {
        section: newSection
      }  
    })
    search(history, query, newSection)
  }

  return (
    <div className="link-panel">
      <div className="link-panel-header">
        Sections
      </div>
      <ul className="link-panel-list">
        <SectionRadioButton 
            key={-1}
            keyboardShortcutsInterceptor={props.keyboardShortcutsInterceptor}
            onClickFunction={e => setSection("all")}
            section="all"
          />
        {sections.map((x, index) => (
          <SectionRadioButton 
            key={index}
            keyboardShortcutsInterceptor={props.keyboardShortcutsInterceptor}
            onClickFunction={e => setSection(x.name)}
            section={x.name}
          />
        ))}
        
      </ul>
    </div>
  );
}
