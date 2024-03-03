// Dependencies and Modules
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AdminView from '../components/ProductsAdminView.js';
import UserView from '../components/ProductsUserView.js'
import UserContext from '../UserContext.js';

export default function Products(){

	const { user } = useContext(UserContext);

	const [ products, setProducts ] = useState([]);
	const [ checkProducts, setCheckProducts ] = useState(false);
	const [ checkProductsCount, setCheckProductsCount ] = useState(0);

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

			if(checkProductsCount < 5){
				setCheckProducts(true);
				setCheckProductsCount(checkProductsCount + 1);
			} else {
				setCheckProducts(false);
			}
		});
	}

	useEffect(() => {
		fetchData();
	}, [checkProducts ? products : null])

	return (
		<>
		{
			(user.isAdmin) ?
				<AdminView productsData={products} fetchData={fetchData} />
			:
				<UserView productsData={products} />
		}
		</>
	);
}
