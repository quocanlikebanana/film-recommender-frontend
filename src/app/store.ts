import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../stores/authSlice';
import authApi from '../routes/auth/services/authApi';
import protectedApi from '../routes/content/services/protectedApi';
import movieApi from '../routes/content/services/movie.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import tmdbApi from '../routes/content/services/tmdp.api';


const rootReducer = combineReducers({
	auth: authReducer,
	authApi: authApi.reducer,
	protectedApi: protectedApi.reducer,
	movieApi: movieApi.reducer,
	tmdbApi: tmdbApi.reducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
			.concat(authApi.middleware)
			.concat(protectedApi.middleware)
			.concat(movieApi.middleware)
			.concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

// Only used in App.tsx
export default store;
