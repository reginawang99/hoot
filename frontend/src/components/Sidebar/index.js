import React from 'react';

import { useOnetimeAPIFetch } from '../../utils/api.js'
import { SERVER_URL } from '../../config';
import LinkPanel from './LinkPanel';
import SectionFilterPanel from './SectionFilterPanel';


import "../App.css"



function Sidebar(props){

	const quickLinks = useOnetimeAPIFetch(`${SERVER_URL}/sg/quick-links`, []);
	const guides = useOnetimeAPIFetch(`${SERVER_URL}/sg/guides`, []);
	


	return (
		<div className="link-sidebar">
          <SectionFilterPanel
            keyboardShortcutsInterceptor={props.keyboardShortcutsInterceptor}
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