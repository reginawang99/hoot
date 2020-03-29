import React from 'react';
import './style.css';
import SearchResult from "../SearchResult"

import config from "../config";
import axios from "axios";

const { SERVER_URL } = config;
/**
* props = {
  header: header, 
  body: [
     {text: "asdf", link: "http://link.com"}
  ]
}
*/
class SearchResultsPanel extends React.Component {

	state = {
      searchResults: null,
      loading: true
    }

	componentDidMount (){
		console.log(this.props);
	    let parseServerData = (response) => {
	      let modData = response.data;
	      this.setState({
	        //TODO: replace this with word truncater and markdown remover.
	        searchResults: modData.map(x => ({...x, contentSummary: x.content})),
	        loading: false
	      });
	    };
	    this.setState({loading: true});
	    axios.get(`${SERVER_URL}/sg/search/`, {
	      params: {
	      	query: this.props.match.params.query
	      }
	    }).then(parseServerData)
  
	}



	render(){
		if(this.state.loading)
			return <p> Loading ... </p>;

		const searchResults = this.state.searchResults;
		const searchResultHeaderString = searchResults? `SEARCH RESULT${(searchResults.length === 1? "": "S")} (${searchResults.length})`: "";

		return (
			<div className="search-result-body">
		    
		      <div className="search-result-header"> 
		          {searchResultHeaderString}
		      </div>
		      
		      <div className="search-result-results">
		        {
		          searchResults.map(x =>  <SearchResult term={x.title} contentSummary={x.contentSummary}/>)
		        }
		      </div>
		    </div>
		);
	}
}

export default SearchResultsPanel;