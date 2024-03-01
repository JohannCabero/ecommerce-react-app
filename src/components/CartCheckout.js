// Dependencies and Modules
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Checkout({ isCartEmpty, fetchCart }){

	const checkout = () => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.message === 'Checkout successful'){
				Swal.fire({
					title: 'Checkout Order Success',
					icon: 'success'
				});

				fetchCart();
			} else if (data.error === 'Cart is not found for the user'){
				Swal.fire({
					title: 'Cart Not Found',
					icon: 'error',
					text: 'Cart is not found for the user'
				});
			} else if (data.error === 'Cart is empty for the user'){
				Swal.fire({
					title: 'Cart is Empty',
					icon: 'error',
				});
			} else if (data.error === `Access Forbidden`){
				Swal.fire({
					title: 'Action Forbidden',
					icon: 'error',
					text: 'Admins are not authorized to checkout a cart'
				});
			} else {
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error'
				});
			}
		});
	}

	return (
		<Button 
			variant="success" 
			size="sm" 
			onClick={() => checkout()}
			disabled={isCartEmpty}
			>Checkout
		</Button>
	);
}