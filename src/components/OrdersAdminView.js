// Dependencies and Modules
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function AdminView({ ordersData, userIdArr, fetchOrders }){

	const [ orders, setOrders ] = useState([]);

	const [ checkOrders, setCheckOrders ] = useState(false);
	const [ checkOrdersCount, setCheckOrdersCount ] = useState(0);

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
						order.productsOrdered.map(item => {

							const quantity = item.quantity;
							const subtotal = item.subtotal;
							const itemId = item._id;

							return (
								<li className="my-2">{itemId}
									<ul>
										<li>Quantity: {quantity}</li>
										<li>Subtotal: {subtotal}</li>
									</ul>
								</li>
							);
						})
						}
						</ul>
						<p>Total: {order.totalPrice}</p>
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

		if(checkOrdersCount < 5){
			setCheckOrdersCount(checkOrdersCount + 1);
			setCheckOrders(true);
		} else {
			setCheckOrders(false);
		}

	}, [ordersData]);

	return (
		<Container fluid className="p-0">
			<h1 className="my-4 text-center page-headers">All Orders</h1>
			<Row className="bg-secondary min-vh-100 p-5">
			<Col>
				<Accordion>
					{orders}
				</Accordion>
				</Col>
			</Row>
		</Container>
	);
	
}