// Dependencies and Modules
import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UpdateItemQuantity from '../components/UpdateCartItemQuantity.js';
import Checkout from '../components/CartCheckout.js';
import UserContext from '../UserContext.js';

export default function Cart(){

	const { user } = useContext(UserContext);

	const [ cart, setCart ] = useState({});
	const [ items, setItems ] = useState([]);
	const [ checkCart, setCheckCart ] = useState(false);
	const [ checkCount, setCheckCount ] = useState(0);

	const removeFromCart = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === `Product deleted successfully`){
				Swal.fire({
					title: 'Product removed',
					icon: 'success'
				});

				setCheckCart(true);
			} else if (data.error === `Product not found in cart`){
				Swal.fire({
					title: 'Product not found in cart',
					icon: 'error'
				});
			} else if (data.error === `Access Forbidden`){
				Swal.fire({
					title: 'Action Forbidden',
					icon: 'error',
					text: 'Admins are not authorized to remove from cart'
				});
			} else {
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error'
				})
			}
		});
	}

	const clearCart = () => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.message === 'Cart cleared successfully') {
				Swal.fire({
					title: 'Cart cleared successfully',
					icon: 'success'
				});
				setCheckCart(true);
			} else if (data.error === 'Cart not found for the user') {
				Swal.fire({
					title: 'Cart not found',
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

	const fetchCart = (reset) => {

		fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if(typeof data.error !== 'string'){
				setCart(data.cart);
				if(items.length <= 0){
					setCheckCart(true);
				} else {
					setCheckCart(false);
				}
			} else if (data.error === "User does not have a cart"){
				setItems([]);
				setCart({})
				setCheckCart(true);
			} else {
				setCheckCart(false);
			}

			if(checkCount < 5){
				setCheckCount(checkCount + 1);
				setCheckCart(true);
			} else {
				setCheckCart(false);
			}

			if(reset === true){
				setCheckCount(0);
				setCheckCart(true);
			}
		});

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`,)
		.then(res => res.json())
		.then(data => {

			if(typeof data.message !== 'string'){
				if(typeof cart.cartItems !== 'undefined'){

					const itemsArr = data.products.filter(product => {
						return cart.cartItems.some(item => item.productId === product._id)
					}).map(product => {
						const { _id, name, description, price } = product;

						const item = cart.cartItems.find(item => item.productId === _id)
								
						const quantity = item.quantity;
						const subtotal = item.subtotal;
						const itemId = item._id;

						return (
							<tr key={itemId}>
								<td>{ name }</td>
								<td>{ description }</td>
								<td>{ price }</td>
								<td>{ quantity }</td>
								<td>{ subtotal }</td>
								<td className="text-center">
									<Button variant="danger" size="sm" onClick={() => removeFromCart(_id)}>Remove Item</Button>
								</td>
								<td className="text-center">
									<UpdateItemQuantity item={item} product={product} fetchCart={fetchCart} />
								</td>
							</tr>
						);
					});
					setItems(itemsArr);
				}
			} else {
				setItems([]);
			}
		});
	}

	useEffect(() => {
		fetchCart();
	}, [checkCart ? cart : null]);

	return (
	<>
	{(user.id !== null) ?

		(!user.isAdmin) ?
		<Container fluid className="text-center min-vh-100 g-0">
			<Row className="min-vh-100">
				<Col className="d-none d-md-block" id="cart-side1" lg={2}></Col>
				<Col className="bg-secondary px-4" id="cart"> 
					<h1 className="my-4 text-white">My Cart</h1>

					<Table striped bordered hover responsive className="mt-4 mb-5 align-middle" variant="dark">
						<thead>
							<tr className="text-center">
								<th>Product</th>
								<th>Description</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Subtotal</th>
								<th colSpan="2">Actions</th>
							</tr>
						</thead>

						<tbody>
							{(items.length > 0) ?
								<>
								{ items }
								</>
							:
								<tr>
									<td colSpan="7">Cart is empty</td>
								</tr>
							}
							
						</tbody>

						<tfoot>
							<tr>
								<td colSpan="5">
									<strong>Total Price: </strong> {cart.totalPrice ? cart.totalPrice : 0}
								</td>
								<td>
									<Checkout isCartEmpty={items.length <= 0} fetchCart={fetchCart} />
								</td>
								<td>
									<Button variant="secondary" size="sm" onClick={() => clearCart()} disabled={items.length <= 0}>Clear Cart</Button>
								</td>
							</tr>
						</tfoot>
					</Table>
				</Col>
				<Col className="d-none d-md-block" id="cart-side2" lg={2}></Col>
			</Row>
		</Container>
		:
		<Navigate to="/products" />
	:
	<Navigate to="/users/login" />
	}
	</>
	);
}