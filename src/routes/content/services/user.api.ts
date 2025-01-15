import { MovieDetailResponse, UserTracking } from "../interfaces/movie.interface";
import protectedApi from "./protectedApi";

const userApi = protectedApi.injectEndpoints({
    endpoints: (builder) => ({
        rating: builder.query<void, { rating: number, movieId: string | number }>({
            query: ({ rating, movieId }) => ({
                url: `users/rating/add/${movieId}`,
                method: 'POST',
                body: {
                    rating: rating,
                }
            })
        }),

        addFavorite: builder.query<void, { movieId: string | number }>({
            query: ({ movieId }) => ({
                url: `users/favorite/add/${movieId}`,
                method: 'POST',
            })
        }),

        removeFavorite: builder.query<void, { movieId: string | number }>({
            query: ({ movieId }) => ({
                url: `users/favorite/remove/${movieId}`,
                method: 'POST',
            })
        }),

        addWatchList: builder.query<void, { movieId: string | number }>({
            query: ({ movieId }) => ({
                url: `users/watchlist/add/${movieId}`,
                method: 'POST',
            })
        }),

        removeWatchList: builder.query<void, { movieId: string | number }>({
            query: ({ movieId }) => ({
                url: `users/watchlist/remove/${movieId}`,
                method: 'POST',
            })
        }),

        addHistory: builder.query<void, { movieId: string | number }>({
            query: ({ movieId }) => ({
                url: `users/history/add/${movieId}`,
                method: 'POST',
            })
        }),

        getUserHistory: builder.query<MovieDetailResponse[], void>({
            query: () => ({
                url: `users/history`,
                method: 'GET',
            })
        }),

        getUserFavorite: builder.query<MovieDetailResponse[], void>({
            query: () => ({
                url: `users/favorite`,
                method: 'GET',
            })
        }),

        getUserWatchList: builder.query<MovieDetailResponse[], void>({
            query: () => ({
                url: `users/watchlist`,
                method: 'GET',
            })
        }),

        getUserRatingQuery: builder.query<MovieDetailResponse[], void>({
            query: () => ({
                url: `users/rating`,
                method: 'GET',
            })
        }),


        getTracking: builder.query<UserTracking, { movieId: string | number }>({
            query: ({ movieId }) => ({
                url: `users/movie/${movieId}`,
                method: 'GET',
            })
        }),
    }),
    overrideExisting: true,
});

export default userApi;
export const {
    useLazyRatingQuery,
    useLazyAddFavoriteQuery,
    useLazyAddWatchListQuery,
    useLazyAddHistoryQuery,
    useLazyRemoveFavoriteQuery,
    useLazyRemoveWatchListQuery,
    useGetUserHistoryQuery,
    useGetUserFavoriteQuery,
    useGetUserWatchListQuery,
    useGetUserRatingQueryQuery,
    useLazyGetTrackingQuery,
    useGetTrackingQuery,
} = userApi;