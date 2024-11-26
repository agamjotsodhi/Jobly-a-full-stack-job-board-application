import { Input, Button, Form, FormGroup, Col, Container } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './styles/EditProfileForm.css';
import { useState } from 'react';
import Alert from './Alert';

const EditProfileForm = ({ editProfileInfo }) => {
	const [ response, setResponse ] = useState(false);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			password: '',
			email: ''
		}
	});

	const onSubmit = async (data) => {
		let success = await editProfileInfo(data);
		if (success === true) {
			setResponse(true);
		} else {
			setResponse(success);
			reset();
		}
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup row>
					<Col
						md={{
							offset: 3,
							size: 6
						}}
						sm="12"
					>
						<div className="FormContainer">
							<h1>Edit Your Profile</h1>
							<div className="Firstname">
								<Controller
									name="firstName"
									control={control}
									render={({ field }) => <Input placeholder="Firstname" {...field} />}
								/>
							</div>
							<div className="Lastname">
								<Controller
									name="lastName"
									control={control}
									render={({ field }) => <Input placeholder="Lastname" {...field} />}
								/>
							</div>
							<div className="Password">
								<Controller
									name="password"
									control={control}
									render={({ field }) => <Input type="password" placeholder="Password" {...field} />}
								/>
							</div>
							<div className="Email">
								<Controller
									name="email"
									control={control}
									render={({ field }) => <Input type="email" placeholder="Email" {...field} />}
								/>
							</div>
							{response === true ? <Alert type={'success'} message="Updated successfully." /> : null}
							{response !== false && response !== true ? (
								<Alert type="danger" message={response[0]} />
							) : null}
							<Button className="EditProfileButton" type="submit" size="lg">
								Save Changes
							</Button>
						</div>
					</Col>
				</FormGroup>
			</Form>
		</Container>
	);
};

export default EditProfileForm;