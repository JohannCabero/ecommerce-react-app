// Dependencies and Modules
import React, { useState, useEffect } from 'react';
import { Accordion, Container, Row, Col } from 'react-bootstrap';

export default function UserView({ ordersData, productsData }) {
    
    const [ orders, setOrders ] = useState([]);
    const [ activeIndex, setActiveIndex ] = useState(null);

    useEffect(() => {
    	const ordersArr = ordersData.map((order, index) => {
    		return (
            <Accordion.Item eventKey={order._id}>
            <Accordion.Header className="text-break">Order ID: {order._id}</Accordion.Header>
                <Accordion.Body>
                	<p>Ordered On: {new Date(order.orderedOn).toLocaleString()}</p>
                    {productsData.filter(product => {
							return order.productsOrdered.some(item => item.productId === product._id)
						}).map(product => {
							const { _id, name, description, price } = product;

							const item = order.productsOrdered.find(item => item.productId === _id);

							const quantity = item.quantity;
							const subtotal = item.subtotal;
							const itemId = item._id;

                    	return (
                        <ul key={itemId}>
	                        <li key={_id}>Product: {name}
		                        <ul>
		                        	<li>Price: &#8369; {price}</li>
		                        	<li>Quantity: {quantity}</li>
		                        	<li>Subtotal: &#8369; {subtotal}</li>
		                        </ul>
	                        </li>
                        </ul>
                    	)
                    })}
                    <p>Total Price: &#8369; {order.totalPrice}</p>
                </Accordion.Body>
        	</Accordion.Item>
       		);
	    });

    	setOrders(ordersArr);

    }, [ordersData]);

    return (
        <Container fluid className="p-0">
        	<h1 className="my-4 text-center page-headers">My Orders</h1>
        	<Row className="bg-primary min-vh-100 py-5 px-3 px-md-5">
        		<Col>
		            <Accordion>
		            	{ orders }
		        	</Accordion>
        		</Col>
        	</Row>
        </Container>
    );
}



