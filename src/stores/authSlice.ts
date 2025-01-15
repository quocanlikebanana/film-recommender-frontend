import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store.ts';
import authApi, { AuthResponse, Token } from '../routes/auth/services/authApi.ts';
import LocalStorageService from '../services/localstorage.service.ts';
import logoutApi from '../routes/content/services/logout.api.ts';
import deleteAccApi from '../routes/content/services/deleteAcc.api.ts';

export type UserSessionInfo = {
	email: string;
	firstName: string;
	lastName: string;
	avatarPath: string;
}

interface AuthState {
	user: UserSessionInfo | null,
	token: Token | null,
};

const initialState: AuthState = ((): AuthState => {
	const accessToken = LocalStorageService.getAccessToken();
	const refreshToken = LocalStorageService.getRefreshToken();
	if (accessToken && refreshToken) {
		return {
			user: null,
			token: {
				accessToken,
				refreshToken,
			},
		}
	}
	return {
		user: null,
		token: null,
	}
})();

function setApiAuthState(state: AuthState, action: PayloadAction<AuthResponse>) {
	state.user = {
		email: action.payload.email,
		firstName: action.payload.firstName,
		lastName: action.payload.lastName,
		avatarPath: action.payload.avatarPath,
	};
	state.token = action.payload.token;
	LocalStorageService.setTokens(state.token);
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuthState(state: AuthState) {
			state.user = null;
			state.token = null;
			LocalStorageService.clearTokens();
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, action) => {
					setApiAuthState(state, action);
				})
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, action) => {
					setApiAuthState(state, action);
				})
			.addMatcher(
				authApi.endpoints.refresh.matchFulfilled, (state, action) => {
					setApiAuthState(state, action);
				})
			.addMatcher(
				authApi.endpoints.googleAuth.matchFulfilled, (state, action) => {
					setApiAuthState(state, action);
				}
			)
			.addMatcher(
				(action) =>
					logoutApi.endpoints.logout.matchFulfilled(action) ||
					logoutApi.endpoints.logout.matchRejected(action),
				(state) => {
					state.user = null;
					state.token = null;
					LocalStorageService.clearTokens();
				})
			.addMatcher(
				(action) =>
					deleteAccApi.endpoints.deleteAcc.matchFulfilled(action) ||
					deleteAccApi.endpoints.deleteAcc.matchRejected(action),
				(state) => {
					state.user = null;
					state.token = null;
					LocalStorageService.clearTokens();
				})

	},
});

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.token != null;

export const { clearAuthState } = authSlice.actions;

export default authSlice.reducer;