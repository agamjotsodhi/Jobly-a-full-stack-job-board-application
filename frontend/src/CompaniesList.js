import React, { useState, useEffect } from 'react';
import JoblyApi from './apiHelper.js';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard.js';
import SearchForm from './SearchForm.js';
import { Button } from 'reactstrap';

//  Display a list of companies with search functionality
const CompaniesList = () => {
	// State variables for storing companies, search term, and no results flag
	const [companies, setCompanies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [noCompaniesFound, setNoCompaniesFound] = useState(false);

	// Fetch companies based on the search term whenever it changes
	useEffect(
		() => {
			async function getAllCompanies(name) {
				let companies = await JoblyApi.getAllCompanies(name);
				companies.length !== 0 ? setCompanies(companies) : setNoCompaniesFound(true);
			}
			getAllCompanies(searchTerm);
		},
		[searchTerm]
	);

	// Function to handle search input from the search form
	const getSearchTerm = (data) => {
		setSearchTerm(data.searchTerm);
	};

	// Function to reset the search term and no results flag
	const resetSearch = () => {
		setSearchTerm('');
		setNoCompaniesFound(false);
	};

	// Render the search form, reset button, no results message, and list of companies
	return (
		<section>
			<div>
				<SearchForm getSearchTerm={getSearchTerm} />
				{searchTerm && <Button onClick={resetSearch}>Reset Search</Button>}
				{noCompaniesFound && <h2>Sorry, there are no companies that match.</h2>}
				{companies.map((company) => (
					<Link
						style={{ textDecoration: 'none', color: 'black' }}
						to={`/companies/${company.handle}`}
						key={company.handle}
					>
						<CompanyCard company={company} />
					</Link>
				))}
			</div>
		</section>
	);
};

export default CompaniesList;