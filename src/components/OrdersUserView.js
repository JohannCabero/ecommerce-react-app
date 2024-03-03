// Dependencies and Modules
import React, { useState } from 'react';
import { Accordion, Container, Row, Col } from 'react-bootstrap';

export default function UserView({ orders }) {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <Container fluid className="p-0">
        	<h1 className="my-4 text-center page-headers">My Orders</h1>
        	<Row className="bg-primary min-vh-100 p-5">
        		<Col>
		            <Accordion>
		            {orders.map((order, index) => (
		                <Accordion.Item eventKey={order._id}>
		                <Accordion.Header className="text-truncate">Order ID: {order._id}</Accordion.Header>
			                <Accordion.Body>
			                	<p>Ordered On: {new Date(order.orderedOn).toLocaleString()}</p>
			                    {order.productsOrdered.map((product, productIndex) => (
			                        <ul key={productIndex}>
				                        <li>Product ID: {product.productId}
					                        <ul>
					                        	<li>Quantity: {product.quantity}</li>
					                        	<li>Subtotal: {product.subtotal}</li>
					                        </ul>
				                        </li>
			                        </ul>
			                    ))}
			                    <p>Total Price: {order.totalPrice}</p>
			                </Accordion.Body>
		            	</Accordion.Item>
		            ))}
		        	</Accordion>
        		</Col>
        	</Row>
        </Container>
    );
}



