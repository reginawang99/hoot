/**
*  Reason: react router history.push does not encode urls
*          react router useParams does not decode urls
*  
*  URL encoding: 
*    https://hoot.dailybruin.com/search/A&E/     [not encoded]
*    https://hoot.dailybruin.com/search/A%8E/  [encoded]
*/

/**
*   example: encoded_history_push(history, "/search/{}/{}", sectionString, queryString)
*/

// magic from stackoverflow
//  "random {name} string".format({name: "what"}) => "random what string"
// https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};



export function encoded_history_push(history, url, args) {
	let encoded_args = Object.keys(args).reduce( (accum, key) => {
		accum[key] = encodeURIComponent(args[key])
        return accum
	}, {})
	history.push(url.formatUnicorn(encoded_args));
}
