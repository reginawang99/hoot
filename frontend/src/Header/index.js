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

function search(history, query, currSection){
  let sectionString;
  if(currSection === null)
    sectionString = "all";
  else
    sectionString = currSection

  // Note: we cannot use `/${sectionString}/${query}`
  // it does not encode url characters 
  encoded_history_push(history, '/search/{sectionString}/{query}', {
    sectionString: sectionString,
    query: query 
  })
}

function Header() {
	const [query, setQuery] = useState('');
  	const queryInput = useRef(null);

  	// this feels like this could be in a loop
	  // but you can't use hooks inside a loop. 
	  useHotkeys('ctrl+k', (e) => KEYBOARD_SHORTCUTS['ctrl+k'](e, setQuery, queryInput));
	  useHotkeys('command+k', (e) => KEYBOARD_SHORTCUTS['ctrl+k'](e, setQuery, queryInput));

	  useHotkeys('ctrl+l', (e) => KEYBOARD_SHORTCUTS['ctrl+l'](e, setQuery, queryInput));
	  useHotkeys('command+l', (e) => KEYBOARD_SHORTCUTS['ctrl+l'](e, setQuery, queryInput));

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
	            onChange={(e) => setQuery(e.target.value)} 
	            onKeyDown={searchOnEnter(history, currSection, setQuery)}/>
	          <button className="header-search-button" onClick={() => search(history, query, currSection)}><img src="/searchbutton.svg"/></button>
        </div>
	)
}