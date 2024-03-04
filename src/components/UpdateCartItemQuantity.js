// Dependencies and Modules
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function UpdateItemQuantity({ item, product, fetchCart }){

	const [ productId, setProductId ] = useState('');
	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ price, setPrice ] = useState(0);

	const [ quantity, setQuantity ] = useState(0);
	const [ subtotal, setSubtotal ] = useState(0);

	const [ showDetails, setShowDetails ] = useState(false);

	const updateCartQuantity = (e, productId) => {
		e.preventDefault();

	    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
	        method: 'PATCH',
	        headers: {
	            'Content-Type': 'application/json',
	            Authorization: `Bearer ${localStorage.getItem('token')}`
	        },
	        body: JSON.stringify({
	            cartItems: [
	                { productId: productId, quantity: quantity }
	            ]
	        })
	    })
	    .then(res => res.json())
	    .then(data => {

	        if (data.message === 'Cart quantity updated successfully') {
	            Swal.fire({
	                title: 'Quantity updated',
	                icon: 'success'
	            });

	            fetchCart(true);
	            closeDetails();
	        } else if (data.error === 'Product not found in cart') {
	            Swal.fire({
	                title: 'Product not found in cart',
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
		
	const openDetails = (item, product) => {
		setProductId(product._id);
		setName(product.name);
		setDescription(product.description);
		setPrice(product.price);
		setQuantity(item.quantity);
		setSubtotal(item.subtotal);

		setShowDetails(true);
	}

	const closeDetails = () => {
		setShowDetails(false);
		setName('');
		setDescription('');
		setPrice(0);
		setQuantity(0);
		setSubtotal(0);
	}

	return (
		<>
		<Button variant="primary" size="sm" onClick={() => openDetails(item, product)}> Update Quantity </Button>

        <Modal show={showDetails} onHide={closeDetails}>
    	<Form onSubmit={e => updateCartQuantity(e, productId)}>
            <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
				<h3 className="text-center">{name}</h3>
				<h5>Description:</h5>
				<p>{description}</p>
				<h5>Price:</h5>
				<p>&#8369; {price}</p>						
			</Modal.Body>
			<Modal.Footer>
				<Form.Group as={Row} controlId="quantity" className="d-inline me-auto">
					<Col className="d-inline ms-auto">
					<Form.Label className="d-inline fw-bold">Quantity: </Form.Label> 
						<Form.Control
							className="d-inline"
							size="sm"
							className="d-inline w-25 me-auto"
							type="number"
							required
							value={quantity}
							onChange={e => {
								setQuantity(e.target.value >= 0 ? e.target.value : 0);
								setSubtotal(e.target.value >= 0 ? e.target.value * price : 0)
							}}
							/>
					</Col>
					<Col className="d-md-inline mt-md-0 mt-2">
						<Form.Label className="d-inline fw-bold">Subtotal: </Form.Label> 
						<Form.Control
							className="d-inline"
							size="sm"
							className="d-inline w-25 me-auto"
							type="number"
							disabled
							value={subtotal}
							onChange={e => setSubtotal(e.target.value)}
							/>
					</Col>
			    </Form.Group>
				<Button variant="success" type="submit" className="d-inline me-auto">Update Item Quantity</Button>
			    <Button variant="secondary" className="d-inline" onClick={closeDetails}>Close</Button>	
			</Modal.Footer>
	    </Form>
        </Modal>
		</>
	);
}