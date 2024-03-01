// Dependencies and Modules
import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext.js';

export default function CreateProduct(){

	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ price, setPrice ] = useState(0);

	const [ isActive, setIsActive ] = useState(false);

	function createProduct(e){
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === `Product successfully created!`){
				Swal.fire({
					title: 'Product successfully created',
					icon: 'success',
				});

				setName('');
				setDescription('');
				setPrice(0);

				navigate('/products');

			} else if(data.error === `Product already exists`){
				Swal.fire({
					title: 'Product already exists',
					icon: 'error'
				});
			} else if (data.error === `Price must be a number`){
				Swal.fire({
					title: 'Invalid Price',
					icon: 'error',
					text: 'Price must be a valid number'
				});
			} else if (data.error === `Invalid input`) {
				Swal.fire({
					title: 'Invalid Input',
					icon: 'error'
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
		if(name !== '' && description !== '' && price > 0){
			setIsActive(true);
		} else {
			setIsActive(false);
		}

	}, [name, description, price])

	return (
		(user.isAdmin === true) ?
			<>
			<Row className="my-0 min-vh-100">
				<Col className="bg-success d-none d-md-block" lg={2}>
				</Col>
				<Col className="px-5" id="create-prod-col" lg={8}>
					<h1 className="my-5 text-center">Create Product</h1>
					<Form onSubmit={e => createProduct(e)}>
						<Form.Group className="my-3">
							<Form.Label>Name:</Form.Label>
							<Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
						</Form.Group>
						<Form.Group className="my-3">
							<Form.Label>Description:</Form.Label>
							<Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
						</Form.Group>
						<Form.Group className="my-3">
							<Form.Label>Price:</Form.Label>
							<Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
						</Form.Group>
					{
						(isActive) ?
							<Button variant="primary" type="submit" className="my-3">Submit</Button>
						:
							<Button variant="primary" type="submit" className="my-3" disabled>Submit</Button>
					}
					</Form>
				</Col>
				<Col className="bg-success d-none d-md-block" lg={2}>
				</Col>
			</Row>
			</>
		:
			<Navigate to="/products" />
	);
}