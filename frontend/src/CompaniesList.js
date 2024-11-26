import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard.js';
import SearchForm from './SearchForm.js';
import { Button } from 'reactstrap';

const CompaniesList = () => {
	const [ companies, setCompanies ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ noCompaniesFound, setNoCompaniesFound ] = useState(false);

	useEffect(
		() => {
			async function getAllCompanies(name) {
				let companies = await JoblyApi.getAllCompanies(name);
				companies.length !== 0 ? setCompanies(companies) : setNoCompaniesFound(true);
			}
			getAllCompanies(searchTerm);
		},
		[ searchTerm ]
	);

	const getSearchTerm = (data) => {
		setSearchTerm(data.searchTerm);
	};

	const resetSearch = () => {
		setSearchTerm('');
		setNoCompaniesFound(false);
	};

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