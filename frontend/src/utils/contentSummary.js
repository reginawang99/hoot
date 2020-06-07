
function isMDList(input){
	if(input.length < 3) 
		return false;
	if(input[0] === "*" && input[1] === " "){
		let numStars = 0; // pairs of stars = bold or italic. Therefore make sure theres an odd one out
		for(let i = 0; i < input.length; i++) {
			if(input[i] === "*")
				numStars++;
		}

		return numStars %2 ===1;
	}
}

function removeMDImages(input) {
	// ![](/url/goes/here)
	return input.replace(/!\[\]\(.*\)/,"");
}


function addContentSummary(entry){
	const {content} = entry
	let contentSummary;
	const firstSentence = content.indexOf(". ") + 1;

	if(firstSentence > 0) { // this means we should crop sentence
		contentSummary = content.substr(0,firstSentence + 1)
	} else {
		contentSummary = content
	}

	// we will truncate contentSummary to the first list
	/**
	* list item
	* list item 2
	*/
	let tmp = ""
	let lines = contentSummary.split("\n");
	let foundList = false;
	for(let i = 0; i < lines.length; i++){
		const line = lines[i].replace("\r", "")
		if(line === "") continue;
		tmp += line + "\r\n"
		if(isMDList(line)) {
			// means it is a list
			foundList = true
		} else if(foundList){
			// means we started adding a list and the next line is no longer a list...
			// we should stop, we have added the first list
			break;
		} 
		
	}
	contentSummary = tmp;


	// lastly, we don't want images in the content summary
	tmp = ""
	lines = contentSummary.split("\n");
	for(let i = 0; i < lines.length; i++){
		const line = removeMDImages(lines[i].replace("\r", ""))
		if(line === "") continue;
		tmp += line + "\r\n"
	}
	contentSummary = tmp;



	// add trailing [...] if we actually truncated
	if(contentSummary.length < content.length){
		contentSummary += "\\[...\\]";
	}

	return {
		...entry,
		contentSummary: contentSummary
	}
}

export default addContentSummary;
