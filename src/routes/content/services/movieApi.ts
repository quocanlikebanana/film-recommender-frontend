import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tmdbConfig } from '../../../app/env';
import { MovieDetailResponse } from '../interfaces/movie.interface'

const movieApiReducerPath = 'movieApi';

const customQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    args = appendQueryStringParam(args, "api_key", tmdbConfig.apiKey);

    return await fetchBaseQuery({
        baseUrl: tmdbConfig.apiUrl,
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        },
    })(args, api, extraOptions);
}

function appendQueryStringParam(args: string | FetchArgs, key: string, value: string): string | FetchArgs {
    let urlEnd = typeof args === 'string' ? args : args.url;
    if (urlEnd.indexOf('?') < 0) {
        urlEnd += '?';
    }
    else {
        urlEnd += '&';
    }
    urlEnd += `${key}=${value}`;
    return typeof args === 'string' ? urlEnd : { ...args, url: urlEnd };
}

const movieApi = createApi({
    reducerPath: movieApiReducerPath,
    baseQuery: customQuery,
    endpoints: (builder) => ({
        getMovieDetail: builder.query<MovieDetailResponse, { movieId: string }>({
            query: ({ movieId }) => ({
                url: `3/movie/${movieId}`,
                method: 'GET',
                params: {
                    language: 'en-US',
                },
            }),
        }),
    }),
});

export const {
    useGetMovieDetailQuery,
} = movieApi;

export default movieApi;
