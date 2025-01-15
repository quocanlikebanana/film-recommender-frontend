import { Token } from "../routes/auth/services/authApi";
import { UserSessionInfo } from "../stores/authSlice";

class LocalStorageService {
	private static ACCESS_TOKEN_KEY = 'access_token';
	private static REFRESH_TOKEN_KEY = 'refresh_token';
	private static USER_OBJECT_KEY = 'user';

	static getAccessToken(): string | null {
		return localStorage.getItem(this.ACCESS_TOKEN_KEY);
	}

	static getRefreshToken(): string | null {
		return localStorage.getItem(this.REFRESH_TOKEN_KEY);
	}

	static getUser(): UserSessionInfo | null {
		const user = localStorage.getItem(this.USER_OBJECT_KEY);
		if (user) {
			return JSON.parse(user);
		}
		return null;
	}

	static setAll(token: Token, user: UserSessionInfo): void {
		localStorage.setItem(this.ACCESS_TOKEN_KEY, token.accessToken);
		localStorage.setItem(this.REFRESH_TOKEN_KEY, token.refreshToken);
		localStorage.setItem(this.USER_OBJECT_KEY, JSON.stringify(user));
	}

	static setAccessToken(token: string): void {
		localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
	}

	static clearTokens(): void {
		localStorage.removeItem(this.ACCESS_TOKEN_KEY);
		localStorage.removeItem(this.REFRESH_TOKEN_KEY);
	}
}

export default LocalStorageService;