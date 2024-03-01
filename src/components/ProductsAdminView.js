// Dependencies and Modules
import { useState, useEffect } from 'react';
import { Table, Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UpdateProduct from './UpdateProduct.js';
import DeactivateProduct from './DeactivateProduct.js'; 

export default function AdminView({ productsData, fetchData }){

	const [ products, setProducts ] = useState([]);

	useEffect(() => {

		const productsArr = productsData.map((product) => {

			return (
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td className="text-center">{product.price}</td>
					<td className={product.isActive ? "text-success text-center" : "text-danger text-center"}>
					{product.isActive ? "Available" : "Unavailable"}
					</td>
					<td className="text-center"><UpdateProduct product={product._id} fetchData={fetchData}/></td>
					<td className="text-center"><DeactivateProduct className="btn btn-danger" product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>
				</tr>
			);
		})
		setProducts(productsArr);

	}, [productsData]);

	return (
		<>
		<Container fluid className="text-center g-0">
			<h1 className="my-4">Admin Dashboard</h1>

			<Row className="bg-primary">
				<span className="mt-3"><Link to="/products/createProduct" className="btn btn-success">Create Product</Link></span>

				<Table striped bordered hover responsive className="mt-4 mb-5 align-middle" id="products-table">
					<thead>
						<tr className="text-center">
							<th>ID</th>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Availability</th>
							<th colSpan="2">Actions</th>
						</tr>
					</thead>

					<tbody>
						{products}
					</tbody>
				</Table>
			</Row>
		</Container>	
		</>
	);
}