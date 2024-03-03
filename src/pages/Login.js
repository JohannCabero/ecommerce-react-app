// Dependencies and Modules
import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import background from '../images/Register-Login-Background.jpg';

const Login = () => {
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		setIsActive(email.trim() !== '' && password.trim() !== '');
	}, [email, password]);

	const authenticate = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
				})
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem('token', data.access);
				retrieveUserDetails(data.access);

				Swal.fire({
					title: 'Login Successful',
					icon: 'success',
					text: 'Welcome to the E-Commerce App!',
				});
			} else {
				handleError(data.error);
			}
		} catch (error) {
			console.error('Error during login:', error);
			handleError('An error occurred during login.');
		}

		setEmail('');
		setPassword('');
	};

	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		.then((res) => res.json())
		.then((data) => {
			setUser({
				id: data.user._id,
				isAdmin: data.user.isAdmin,
			});
		})
		.catch((err) => {
			console.error('Error retrieving user details:', err);
			handleError('Error retrieving user details');
		});
	};

	const handleError = (errorMessage) => {
		Swal.fire({
			title: 'Authentication failed',
			icon: 'error',
			text: errorMessage,
		});
	};

	return (
		(user.id !== null) ?
			<Navigate to="/products" />
		:
			<Row className="min-vh-100">
				<Col xs={12} md={{ order: 'last' }} lg={{ span: 5, order: 'first' }} className="bg-primary px-5 g-0 text-white">
					<Form onSubmit={authenticate} className="mb-5">
						<h1 className="my-5 text-center">Login</h1>
						<Form.Group controlId="userEmail" className="my-3">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group controlId="password" className="my-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>

						<p>Don't have an account? <Link className="text-white" to="/users/register">Register Here</Link></p>

						<Button variant="success" type="submit" id="submitBtn" disabled={!isActive}>
						Submit
						</Button>
					</Form>
				</Col>
				<Col lg={7} className="g-0 d-none d-sm-block reg-log-img-col">
					{/*<img src={background} className="img-fluid reg-log-img d-lg-none" />*/}
				</Col>
			</Row>
	);
};

export default Login;
