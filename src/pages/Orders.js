// Dependencies and Modules
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AdminView from '../components/OrdersAdminView.js';
import UserView from '../components/OrdersUserView.js';
import UserContext from '../UserContext.js';

export default function Orders(){

	const { user } = useContext(UserContext);

	const [ orders, setOrders ] = useState([]);

	const [ checkOrders, setCheckOrders ] = useState(false);
	const [ checkOrdersCount, setCheckOrdersCount ] = useState(0);

	const [ userIdArr, setUserIdArr ] = useState([]);

	const fetchOrders = () => {

		let fetchUrl = user.isAdmin ? `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders` : `${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`;

		fetch(fetchUrl, {
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
				setCheckOrders(true);

			} else {
				setOrders([]);
				setCheckOrders(false);
			}

			if(checkOrdersCount < 5){
				setCheckOrdersCount(checkOrdersCount + 1);
				setCheckOrders(true);
			} else {
				setCheckOrders(false);
			}
		});
	}

	useEffect(() => {
		fetchOrders();
	}, [checkOrders ? orders : null ])

	return (
		<>
			{(user.id !== null) ?

				user.isAdmin ?
					<AdminView ordersData={orders} userIdArr={userIdArr} fetchOrders={fetchOrders} />
				:
					<UserView orders={orders} />

			:
				<Navigate to="/users/login" />
			}
		</>
	);
}