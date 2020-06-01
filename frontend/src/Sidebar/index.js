import "../App.css"


// the following functions are curried
// woah cs 131 EgErT
function onSectionPanelClick (setCurrSection, history, query){
  return (x) => { // x is passed by FunctionPanel. its an array of what has been selected
    let newSection;
    if(x.length === 0){
      // we are selecting no sections
      newSection = null
    } else {
      newSection = x[0].text; // for now we can only filter by one section
    }

    setCurrSection(newSection)
    search(history, query, newSection)
  }
}


function Sidebar(){

	const sections = useOnetimeAPIFetch(`${SERVER_URL}/sg/sections`, []);
	const quickLinks = useOnetimeAPIFetch(`${SERVER_URL}/sg/quick-links`, []);
	const guides = useOnetimeAPIFetch(`${SERVER_URL}/sg/guides`, []);
	const [currSection, setCurrSection] = useState(null);  // null means all sections

	return (
		<div className="link-sidebar">
          <FunctionPanel
            header="Sections"
            body={sections.map(x => ({...x, text: x.name}))}
            callback={onSectionPanelClick(setCurrSection, history, query, currSection)}
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