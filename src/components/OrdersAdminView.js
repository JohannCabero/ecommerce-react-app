// Dependencies and Modules
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function AdminView({ ordersData, productsData, usersData, userIdArr }){

	const [ orders, setOrders ] = useState([]);

	useEffect(() => {

		const ordersArr = usersData.filter(user => {
				// Filter to retrieve only the users that have orders
				return userIdArr.some(userId => userId === user._id);
		}).map(user => {
			// For every returned user that has an order, run the code below
			return (
			<Accordion.Item eventKey={user._id}>
			<Accordion.Header className="text-break"><strong>User: {user.email}</strong>, ID: {user._id}</Accordion.Header>
			{
			ordersData.map(order => {
				// For every order that has the same user id as the current user in the loop, include in the current accordion item group
				if(order.userId === user._id){
					return (
					<Accordion.Body key={order._id}>
						<p><strong>Date Purchased: {new Date(order.orderedOn).toLocaleString()}</strong></p>
						<p>Items:</p>
						<ul>
						{
						productsData.filter(product => {
							// Filter to retrieve only the products in the current order
							return order.productsOrdered.some(item => item.productId === product._id)
						}).map(product => {
							const { _id, name, description, price } = product;

							// For the current retrieved product detail, find its corresponding item details in the order
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
						}) // productsData.map end
						}
						</ul>
						<p>Total: &#8369; {order.totalPrice}</p>
						<hr />
					</Accordion.Body>
					); // if(order.userId === user._id) return end
				} // if(order.userId === user._id) end
			}) // ordersData.map end
			}
			</Accordion.Item>
			); // usersData.map return end
			
		}); // usersData.map end

		setOrders(ordersArr);

	}, [ordersData]);

	return (
		<Container fluid className="p-0">
			<h1 className="my-4 text-center page-headers">All Orders</h1>
			<Row className="bg-secondary min-vh-100 py-5 px-3 px-md-5">
			<Col>
				<Accordion>
					{ orders }
				</Accordion>
				</Col>
			</Row>
		</Container>
	);
	
}