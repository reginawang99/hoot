/**
*  Reason: react router history.push does not encode urls
*          react router useParams does not decode urls
*  
*  URL encoding: 
*    https://hoot.dailybruin.com/search/A&E/Kerckhoff Hall     [not encoded]
*    https://hoot.dailybruin.com/search/A%8E/Kerckhoff%20Hall  [encoded]
*/


export const encoded_history_push = (history, url) {
	let encoded_args = arguments.map(a => encodeURIComponent(a))
	history.push(url.format(encoded_args));
}