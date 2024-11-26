import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './styles/CompanyCard.css';

const CompanyCard = ({ company }) => {
	return (
		<div className="companyCard">
			<Card body className="my-2">
				<CardBody>
					<CardTitle tag="h5">{company.name}</CardTitle>
					<CardText>{company.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
};

export default CompanyCard;