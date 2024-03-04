// Dependencies and Modules
import { Button, Form, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function UpdateProduct({ product, fetchData }){

	const [ productId, setProductId ] = useState('');

	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ price, setPrice ] = useState(0);

	const [ showUpdate, setShowUpdate ] = useState(false);
	const [ isActive, setIsActive ] = useState(false);

	const openUpdate = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setProductId(data.product._id);
			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		});

		setShowUpdate(true);
	}

	const closeUpdate = () => {
		setName('');
		setDescription('');
		setPrice(0);
		setShowUpdate(false);
	}

	const updateProduct = (e, productId) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`, {
			method: 'PATCH',
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
			if(data.message === `Product updated successfully!`){
				Swal.fire({
					title: 'Product updated successfully',
					icon: 'success'
				});

				closeUpdate();
				fetchData();
			} else {
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error'
				});

				closeUpdate();
				fetchData();
			}
		});
	}

	useEffect(() => {
		if(name !== '' && description !== '' && price !== ''){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [name, description, price])

	return (
		<>
			<Button variant="primary" size="sm" onClick={() => openUpdate(product)}> Edit </Button>

			{/*EDIT MODAL*/}
            <Modal show={showUpdate} onHide={closeUpdate}>
                <Form onSubmit={e => updateProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={name}
                            	onChange={e => setName(e.target.value)}
                            	/>
                        </Form.Group>
                        <Form.Group controlId="productDescription" className="mt-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={description}
                            	onChange={e => setDescription(e.target.value)}
                            	/>
                        </Form.Group>
                        <Form.Group controlId="productPrice" className="mt-2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                            	type="number" 
                            	required
                            	value={price}
                            	onChange={e => setPrice(e.target.value)}
                            	/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit" disabled={!isActive}>Submit</Button>
                        <Button variant="secondary" onClick={closeUpdate}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
		</>
	);
}