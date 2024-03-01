// Dependencies and Modules
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function ProductView({ product }){

	const [ productId, setProductId ] = useState('');
	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ price, setPrice ] = useState(0);

	const [ quantity, setQuantity ] = useState(0);

	const [ showDetails, setShowDetails ] = useState(false);
	const [ isActive, setIsActive ] = useState(false);

	const openDetails = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setProductId(data.product._id);
			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		});

		setShowDetails(true);
	}

	const closeDetails = () => {
		setShowDetails(false);
		setName('');
		setDescription('');
		setPrice(0);
		setQuantity(0);
	}

	const addToCart = (e, productId) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				cartItems: [{
					productId: productId,
					quantity: quantity
				}]
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === 'Products added to the cart successfully'){
				Swal.fire({
					title: 'Product added to cart',
					icon: 'success',
					text: `${name} (${quantity}) added to cart`
				});

				closeDetails();
			} else if(data.error === `Access Forbidden`){
				Swal.fire({
					title: 'Action Forbidden',
					icon: 'error',
					text: 'Admins are not authorized to add to cart'
				});

				closeDetails();
			} else if (data.error === `Product with ID ${productId} not found`) {
				Swal.fire({
					title: 'Product not found',
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
		if(quantity > 0){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [quantity])

	return (
		<>
			<Button variant="primary" size="sm" onClick={() => openDetails(product)}> Details </Button>

            <Modal show={showDetails} onHide={closeDetails}>
        	<Form onSubmit={e => addToCart(e, productId)}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
					<h3 className="text-center">{name}</h3>
					<h5>Description:</h5>
					<p>{description}</p>
					<h5>Price:</h5>
					<p>PhP {price}</p>						
				</Modal.Body>
				<Modal.Footer>
					<Form.Group controlId="quantity" className="d-inline me-auto">
						<Form.Label className="d-inline fw-bold">Quantity: </Form.Label> 
						<Form.Control
							className="d-inline"
							size="sm"
							className="d-inline w-25 me-auto"
							type="number"
							required
							value={quantity}
							onChange={e => setQuantity(e.target.value >= 0 ? e.target.value : 0)}
							/>
				    </Form.Group>
					<Button variant="success" type="submit" className="d-inline me-auto me-md-0" disabled={!isActive}>Add to Cart</Button>
				    <Button variant="secondary" className="d-inline" onClick={closeDetails}>Close</Button>	
				</Modal.Footer>
		    </Form>
            </Modal>
		</>
	);

}