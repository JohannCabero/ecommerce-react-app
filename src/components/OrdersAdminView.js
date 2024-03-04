// Dependencies and Modules
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function AdminView({ ordersData, productsData, userIdArr }){

	const [ orders, setOrders ] = useState([]);

	useEffect(() => {

		const ordersArr = userIdArr.map(userId => {	
			return (
			<Accordion.Item eventKey={userId}>
			<Accordion.Header>User Id: {userId}</Accordion.Header>
			{
			ordersData.map(order => {
				if(order.userId === userId){
					return (
					<Accordion.Body key={order._id}>
						<p><strong>Date Purchased: {new Date(order.orderedOn).toLocaleString()}</strong></p>
						<p>Items:</p>
						<ul>
						{
						productsData.filter(product => {
							return order.productsOrdered.some(item => item.productId === product._id)
						}).map(product => {
							const { _id, name, description, price } = product;

							const item = order.productsOrdered.find(item => item.productId === _id);

							const quantity = item.quantity;
							const subtotal = item.subtotal;
							const itemId = item._id;

							return (
								<li className="my-2" key={_id}>{name}
									<ul>
										<li>Price: &#8369; {price}</li>
										<li>Quantity: {quantity}</li>
										<li>Subtotal: &#8369; {subtotal}</li>
									</ul>
								</li>
							);
						})
						}
						</ul>
						<p>Total: &#8369; {order.totalPrice}</p>
						<hr />
					</Accordion.Body>
					);
				}
			})
			}
			</Accordion.Item>
			);
			
		});

		setOrders(ordersArr);

	}, [ordersData]);

	return (
		<Container fluid className="p-0">
			<h1 className="my-4 text-center page-headers">All Orders</h1>
			<Row className="bg-secondary min-vh-100 p-5">
			<Col>
				<Accordion>
					{ orders }
				</Accordion>
				</Col>
			</Row>
		</Container>
	);
	
}