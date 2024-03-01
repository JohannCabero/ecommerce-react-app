// Dependencies and Modules
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function DeactivateProduct({product, isActive, fetchData}) {

	const archiveToggle = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const successMessage = data.message || 'Product deactivated successfully';
        
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: successMessage
            });
        
            fetchData();
        })
        .catch(error => {
            console.error(error);

            Swal.fire({
                title: 'Something Went Wrong',
                icon: 'error',
                text: 'Please Try again'
            });

            fetchData();
        });
    };

	const activateToggle = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const successMessage = data.message || 'Product activated successfully';
        
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: successMessage
            });
        
            fetchData();
        })
        .catch(error => {
            console.error(error);

            Swal.fire({
                title: 'Something Went Wrong',
                icon: 'error',
                text: 'Please Try again'
            });

            fetchData();
        });
    };

	return(
		<>
			{isActive ?

				<Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Deactivate</Button>

				:

				<Button variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>

			}
		</>

	)
}