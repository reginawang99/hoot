import {encoded_history_push} from './urls.js'


export function search(history, query, currSection){
  let sectionString;
  if(currSection === null)
    sectionString = "all";
  else
    sectionString = currSection

  // Note: we cannot use `/${sectionString}/${query}`
  // it does not encode url characters 
  if(query != null)
    encoded_history_push(history, '/search/{sectionString}/search?query={query}', {
      sectionString: sectionString,
      query: query 
    })
  else
    encoded_history_push(history, '/search/{sectionString}/', {
      sectionString: sectionString,
    })
}