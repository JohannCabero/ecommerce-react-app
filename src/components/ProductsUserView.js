// Dependencies and Modules
import { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductView from './ProductView.js';

export default function UserView({ productsData }){

	const [ products, setProducts ] = useState([]);

	useEffect(() => {

		const productsArr = productsData.map(product => {
			if(product.isActive === true){
				const { _id, name, description, price } = product;

				return (
					<Card className="my-3" key={_id}>
						<Card.Body>
							<Card.Title>{ name }</Card.Title>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text>{ description }</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>{ price }</Card.Text>
							<ProductView product={_id} />
						</Card.Body>
					</Card>
				);
			} else {
				return null;
			}
		});
		setProducts(productsArr);

	}, [productsData]);

	return (
		<>
		<Row className="bg-success">
			<Col className="p-4 min-vh-100" id="product-header">
				<h1 className="text-center text-light mb-4">Products</h1>
				{ products }
			</Col>
		</Row>
		</>
	);
}