// Dependencies and Modules
import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext.js';

export default function Logout(){

	const { unsetUser, setUser } = useContext(UserContext);

	unsetUser();

	useEffect(() => {
		setUser({
			id: null,
			isAdmin: null
		});
	});

	return (
		<Navigate to='/users/login' />
	);
}