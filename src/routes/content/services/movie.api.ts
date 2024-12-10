import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tmdbConfig } from '../../../app/env';
import { MovieDetailResponse } from '../interfaces/movie.interface'

const movieApiReducerPath = 'movieApi';
const backendFetchQuery = fetchBaseQuery({
    baseUrl: tmdbConfig.apiUrl,
    prepareHeaders: (headers) => {
        headers.set('accept', 'application/json');
        headers.set('Authorization', `Bearer ${tmdbConfig.apiKey}`);
        return headers;
    },
});

const movieApi = createApi({
    reducerPath: movieApiReducerPath,
    baseQuery: backendFetchQuery,
    endpoints: (builder) => ({
        getMovieDetail: builder.query<MovieDetailResponse, { movieId: string }>({
            query: ({ movieId }) => ({
                url: `movie/${movieId}`,
                method: 'GET',
                params: { language: 'en-US' },
            }),
        }),
    }),
});

export const {
    useGetMovieDetailQuery,
} = movieApi;

export default movieApi;
