import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../stores/authSlice';
import LocalStorageService from '../services/localstorage.service';
import { useRefreshMutation } from '../routes/auth/services/authApi';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const isAuthenticated = useSelector(selectIsAuth);
	const [refresh] = useRefreshMutation();

	useEffect(() => {
		if (!isAuthenticated) {
			const refreshToken = LocalStorageService.getRefreshToken();
			if (refreshToken) {
				refresh({ refreshToken });
			}
		}
	}, [isAuthenticated, refresh]);

	const element = isAuthenticated ? children : <Navigate to="/login" />;
	return element;
};

export default ProtectedRoute;