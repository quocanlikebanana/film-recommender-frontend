import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendURL } from '../../../app/env';

interface LoginRequest {
	email: string;
	password: string;
}

interface RegisterRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	avatarPath: string;
}

interface Token {
	accessToken: string;
	refreshToken: string;
}

interface AuthResponse {
	email: string;
	firstName: string;
	lastName: string;
	token: Token;
	avatarPath: string;
}

const authApiReducerPath = 'authApi';
const backendFetchQuery = fetchBaseQuery({ baseUrl: backendURL });

// Define a service using a base URL and expected endpoints
const authApi = createApi({
	reducerPath: authApiReducerPath,
	baseQuery: backendFetchQuery,
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, LoginRequest>({
			query: (creadentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: creadentials,
			}),
		}),

		register: builder.mutation<AuthResponse, RegisterRequest>({
			query: (createNew) => ({
				url: 'auth/register',
				method: 'POST',
				body: createNew,
			}),
		}),

		refresh: builder.mutation<AuthResponse, { refreshToken: string }>({
			query: (refreshToken) => ({
				url: 'auth/refresh',
				method: 'POST',
				body: { refreshToken },
			}),
		}),

		googleAuth: builder.mutation<AuthResponse, { idToken: string }>({
			query: ({ idToken }) => ({
				url: 'auth/loginWithGoogle',
				method: 'POST',
				body: { idToken },
			}),
		}),
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useRefreshMutation,
	useGoogleAuthMutation,
} = authApi;

export type { AuthResponse, Token };
export default authApi;