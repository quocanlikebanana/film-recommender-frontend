import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { noAuth, tmdbConfig } from '../app/env';
import LocalStorageService from '../services/localstorage.service';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.user !== null);
	if (noAuth) {
		LocalStorageService.setAll({ accessToken: tmdbConfig.accessToken, refreshToken: "" }, { email: "", firstName: "", lastName: "", avatarPath: "" });
	}
	const element = (isAuthenticated || noAuth) ? children : <Navigate to="/login" />;
	return element;
};

export default ProtectedRoute;