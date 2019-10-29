import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import Listings from '../Listings/listings';
const BACKEND_URL = 'http://localhost:4000';

interface Listing {
	id: number;
	name: string;
}
interface IStates {
    listings: Listing[];
	searchQuery: string;
}

// Will finish when listings component is completed

class SearchPage extends React.Component<RouteComponentProps<any>, IStates> {
	public readonly state: Readonly<IStates> = {
        listings: [],
		searchQuery: ''
    };
    
    componentWillReceiveProps() {
        this.componentDidMount();
    }

	public async componentDidMount() {
        const resListings: Listing[] = await this.retrieveListing();
        this.setState({ searchQuery: this.props.match.params.searchQuery, listings: resListings });
	}

	public render() {
		const { searchQuery, listings } = this.state;
		return (
			<>
				<h2>Search: {searchQuery}</h2>
				<Listings listings={listings}/>
			</>
		);
	}

	private async retrieveListing() {
		const result = await axios.get(
			BACKEND_URL + '/listings'
		);
		const resListings = result.data.listings.map((product: any) => ({
			id: product.id,
			name: product.title
		}));
		return resListings;	
	}
}

export default SearchPage;