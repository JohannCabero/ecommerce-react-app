// Dependencies and Modules
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AdminView from '../components/OrdersAdminView.js';
import UserView from '../components/OrdersUserView.js';
import UserContext from '../UserContext.js';

export default function Orders(){

	const { user } = useContext(UserContext);

	const [ orders, setOrders ] = useState([]);
	const [ products, setProducts ] = useState([]);
	const [ users, setUsers ] = useState([]);

	const [ checkOrders, setCheckOrders ] = useState(false);
	const [ checkOrdersCount, setCheckOrdersCount ] = useState(0);

	const [ userIdArr, setUserIdArr ] = useState([]);

	const fetchOrders = () => {

		let fetchOrdersUrl = user.isAdmin ? `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders` : `${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`;

		fetch(fetchOrdersUrl, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if(typeof data.message !== 'string'){
				setOrders(data.orders);

				const userIds = [];
				data.orders.forEach(order => {
					if(!userIds.includes(order.userId)){
						userIds.push(order.userId);
					}
				});

				setUserIdArr(userIds);

			} else {
				setOrders([]);
			}

			if(checkOrdersCount < 3){
				setCheckOrders(true);
				setCheckOrdersCount(checkOrdersCount + 1);
			} else {
				setCheckOrders(false);
			}
		});

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/all`, {
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_ADMIN_TOKEN}`
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

		if(user.isAdmin){
			fetch(`${process.env.REACT_APP_API_BASE_URL}/users/all`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.json())
			.then(data => {
				if(typeof data.message !== 'string'){
					setUsers(data.users);
				} else {
					setUsers([]);
				}
			});
		}

	}

	useEffect(() => {
		fetchOrders();
	}, [checkOrders ? orders : null ])

	return (
		<>
			{(user.id !== null) ?

				user.isAdmin ?
					<AdminView ordersData={orders} productsData={products} usersData={users} userIdArr={userIdArr} />
				:
					<UserView ordersData={orders} productsData={products} />

			:
				<Navigate to="/users/login" />
			}
		</>
	);
}