const backendURL = import.meta.env.VITE_BACKEND_URL as string;
const isDevelopment = import.meta.env.DEV;

const noAuth: boolean = isDevelopment && import.meta.env.VITE_NO_AUTH == "true" ? true : false;

const aiConfig = {
	apiKey: import.meta.env.VITE_AI_API_KEY,
	baseUrl: import.meta.env.VITE_AI_BASE_URL,
}

const tmdbConfig = {
	apiKey: import.meta.env.VITE_TMDB_API_KEY,
	apiUrl: import.meta.env.VITE_TMDB_API_URL,
	accessToken: import.meta.env.VITE_TMDB_ACCESS_TOKEN,
}

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export {
	backendURL,
	isDevelopment,
	noAuth,
	firebaseConfig,
	tmdbConfig,
	aiConfig
};