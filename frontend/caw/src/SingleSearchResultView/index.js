import React from 'react';
import config from "../config";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

const { SERVER_URL } = config;

/**
* /entry/entry%20name
*/
class SingleSearchResultView extends React.Component {

	state = {
		isLoading: true, 
		hasErrored: false
	}

	componentDidMount(){
		const entryName = this.props.match.params.entryName;
		console.log(this.props)
		axios.get(`${SERVER_URL}/sg/entry/${entryName}`).then(({data}) => {
			console.log(data);
			this.setState({
				...this.state,
				title: data.title,
				content: data.content,
				section: data.section,
				tags: data.tags,
				isLoading: false
			})
		}).catch((error)=>{
			console.log(error)
			this.setState({
				...this.state,
				isLoading: false,
				hasErrored: true
			})
		})
	}

	render(){
		if(this.state.isLoading)
			return <p> Loading... </p>

		if(this.state.hasErrored)
			return <p> Unable to find entry for "{this.props.match.params.entryName}"</p>

		return <div>
			<h1> {this.state.title} </h1>
			<ReactMarkdown source={this.state.content} />
		</div>;
	}
}

export default SingleSearchResultView;