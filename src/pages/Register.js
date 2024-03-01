// Dependencies and Modules
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import UserContext from '../UserContext.js';
import background from '../images/Register-Login-Background.jpg';

export default function Register(){

	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ mobileNo, setMobileNo ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	const [ isActive, setisActive ] = useState(false);

	function registerUser(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === `User registered successfully!`){
				Swal.fire({
					title: 'Registration Successful',
					icon: 'success',
					text: 'User has been successfully registered'
				});

				setFirstName('');
				setLastName('');
				setEmail('');
				setMobileNo('');
				setPassword('');
				setConfirmPassword('');

				navigate('/users/login');

			} else if (data.error === `Invalid email`) {
				Swal.fire({
					title: 'Invalid email',
					icon: 'error'
				});
			} else if (data.error === `Invalid mobile number`){
				Swal.fire({
					title: 'Invalid mobile number',
					icon: 'error',
					text: 'Mobile number must be 11 digits'
				});
			} else if (data.error === `Password must be at least 8 characters`){
				Swal.fire({
					title: 'Invalid password',
					icon: 'error',
					text: 'Password must be at least 8 characters'
				});
			} else if (data.error == `Email already in use`){
				Swal.fire({
					title: 'Email already exists',
					icon: 'error',
					text: 'Please use a different email'
				});
			} else {
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error'
				});
			}
		});
	}

	useEffect(() => {
		if(firstName !== '' && lastName !== '' && email !== '' && mobileNo !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword && mobileNo.length === 11){
			setisActive(true);
		} else {
			setisActive(false);
		}
	}, [firstName, lastName, email, mobileNo, password, confirmPassword])

	return (
		(user.id !== null) ?
			<Navigate to="/products" />
		:
		<Row className="min-vh-100">
			<Col xs={12} md={{ order: 'last' }} lg={{ span: 5, order: 'first' }} className="bg-success px-5 g-0 text-white">
				<Form onSubmit={(e) => registerUser(e)} className="mb-5">
				<h1 className="my-5 text-center">Register</h1>
					<Form.Group className="my-3">
						<Form.Label>First Name:</Form.Label>
						<Form.Control 
						type="text" 
						placeholder="Enter First Name" 
						required
						value={firstName}
						onChange={e => {setFirstName(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="my-3">
						<Form.Label>Last Name:</Form.Label>
						<Form.Control 
						type="text" 
						placeholder="Enter Last Name" 
						required
						value={lastName}
						onChange={e => {setLastName(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="my-3">
						<Form.Label>Email:</Form.Label>
						<Form.Control 
						type="email" 
						placeholder="Enter Email" 
						required
						value={email}
						onChange={e => {setEmail(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="my-3">
					<Form.Label>Mobile No:</Form.Label>
						<Form.Control 
						type="number" 
						placeholder="Enter 11 Digit No." 
						required
						value={mobileNo}
						onChange={e => {setMobileNo(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="my-3">
						<Form.Label>Password:</Form.Label>
						<Form.Control 
						type="password" 
						placeholder="Enter Password" 
						required
						value={password}
						onChange={e => {setPassword(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="mt-3 mb-4">
						<Form.Label>Confirm Password:</Form.Label>
						<Form.Control 
						type="password" 
						placeholder="Confirm Password" 
						required
						value={confirmPassword}
						onChange={e => {setConfirmPassword(e.target.value)}}
						/>
					</Form.Group>
					{/*conditionally render submit button based on isActive state, the current state of the isActive is false*/}
					{ isActive ?
					<Button variant="primary" type="submit">Submit</Button>
					:
					<Button variant="primary" type="submit" disabled>Submit</Button>
					}
				</Form>
			</Col>
			<Col lg={7} className="g-0 d-none d-sm-block">
				<img src={background} className="img-fluid reg-log-img" />
			</Col>
		</Row>	
	);
};