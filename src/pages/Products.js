// Dependencies and Modules
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AdminView from '../components/ProductsAdminView.js';
import UserView from '../components/ProductsUserView.js'
import UserContext from '../UserContext.js';

export default function Products(){

	const { user } = useContext(UserContext);

	const [ products, setProducts ] = useState([]);

	const fetchData = () => {

		let fetchUrl = user.isAdmin ? `${process.env.REACT_APP_API_BASE_URL}/products/all` : `${process.env.REACT_APP_API_BASE_URL}/products/`

		fetch(fetchUrl, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(typeof data.message !== 'string'){
				setProducts(data.products);
			} else {
				setProducts([]);
			}
		});
	}

	useEffect(() => {
		fetchData();
	}, [products])

	return (
		<>
			{(user.id !== null) ?

				(user.isAdmin) ?
					<AdminView productsData={products} fetchData={fetchData} />
				:
					<UserView productsData={products} />

			:
				<Navigate to="/users/login" />
			}
		</>
	);
}
