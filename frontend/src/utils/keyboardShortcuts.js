/**
*  This is code for shortcuts:
*
*  Reason why its complicated:
*    We have a shortcuts package for react BUT it doesn't work when you
*    are inside the query input. So we ended up checking for shortcuts inside
*    the onChange callback. 
*
*    However, having the same code in 2 places is a bad idea. So this just centralizes it.
* 
*  Usage:
*    Most of the time, this is the only thing you need to change.
*      "keyboard+short+cut": function(e, setQuery, queryInput)
*
*    e = javascript document event object
*    setQuery = function to set the current query string
*    queryInput = React reference to query input tag
* 
*  Note: Control/Command, Shift and letters are supported. If you want to make a shortcut that uses something else
*  you will need to modify matches shortcut
*  Note: ctrl = control on windows, command on mac
*  Note: in order to use shift, use capital letters
*/
export const KEYBOARD_SHORTCUTS = {
	"ctrl+k": function(e, setQuery, queryInput){ // feel free to add more parameters. Just make sure to change executeAllShortcuts and App.js
		e.preventDefault(); // stops the browser's shortcut
		setQuery('');       // clears the current query
		if(queryInput)      // when this is called by the input tag, it is already in focus so no need to do the next line.
    		queryInput.current.focus();
	},
	"ctrl+l": function(e, setQuery, queryInput){
		e.preventDefault(); // stops the browser's shortcut
		if(queryInput)      // when this is called by the input tag, it is already in focus so no need to do the next line.
    		queryInput.current.focus();
	}
}


/**
* Only supports Control/Command, shift (by using captial letters) and letters
*/
export const matchesShortcut = (e, shortcut) => {
	let shortcut_sequence = shortcut.split("+");
	let matchesCommand = shortcut_sequence.reduce((accumulator, key) => {
		if(key === 'ctrl'){
			return accumulator && (e.ctrlKey || e.metaKey);
		} else { //we will assume it is a key
			return accumulator && e.key === key;
		}
	}, true)
	return matchesCommand;
}

export const executeAllShortcuts = (e, setQuery, queryInput) => {
	// the key is the shortcut
	// the value is the function
	Object.keys(KEYBOARD_SHORTCUTS).map( (shortcut) => {
		if(matchesShortcut(e, shortcut)){
			KEYBOARD_SHORTCUTS[shortcut](e, setQuery, queryInput)
		}
	})
}