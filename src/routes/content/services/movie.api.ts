import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendURL } from '../../../app/env';
import { Cast, MovieDetailResponse, Navigate, Review, Trailer } from '../interfaces/movie.interface'
import { Paged } from '../interfaces/common.type';

const movieApiReducerPath = 'movieApi';

export type SearchMoviesMovieRequest = {
    query: string;
    include_adult?: boolean;
    language?: string;
    primary_release_year?: string;
    page: number;
    region?: string;
    year?: string;
}

export type ListMoviesResponse = Paged<MovieDetailResponse>;
export type ListReviewsResponse = Paged<Review>;
export type ListCastResponse = {
    id: number;
    cast: Cast[];
};

const customQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    return await fetchBaseQuery({
        baseUrl: backendURL,
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        },
    })(args, api, extraOptions);
}

const movieApi = createApi({
    reducerPath: movieApiReducerPath,
    baseQuery: customQuery,
    endpoints: (builder) => ({
        getMovieDetail: builder.query<MovieDetailResponse, { movieId: string }>({
            query: ({ movieId }) => ({
                url: `movies/${movieId}`,
                method: 'GET',
                params: {
                    language: 'en-US',
                },
            }),
        }),

        getPopularMovies: builder.query<ListMoviesResponse, { page: number }>({
            query: ({ page }) => ({
                url: `movies/popular?page=${page}`,
                method: 'GET',
            }),
        }),

        getUpcomingMovies: builder.query<ListMoviesResponse, { page: number }>({
            query: ({ page }) => ({
                url: `3/movie/upcoming?page=${page}`,
                method: 'GET',
            }),
        }),

        searchMovies: builder.query<ListMoviesResponse, SearchMoviesMovieRequest>({
            query: (params) => {
                const paramsQuery = {
                    query: params.query,
                    include_adult: params.include_adult?.toString() || 'false',
                    language: params.language || 'en-US',
                    primary_release_year: params.primary_release_year || '',
                    page: params.page?.toString() || '1',
                    region: params.region || '',
                    year: params.year || '',
                }
                const filteredParams = Object.fromEntries(
                    Object.entries(paramsQuery).filter(([, value]) => value !== '')
                );
                const queryString = new URLSearchParams(filteredParams).toString();
                return {
                    url: `movies/search?${queryString}`,
                    method: 'GET',
                };
            },
        }),

        getSimilarMovies: builder.query<MovieDetailResponse[], { movieId: string }>({
            query: ({ movieId }) => ({
                url: `llm/similar/${movieId}`,
                method: 'GET',
            }),
        }),


        getLLMMovies: builder.query<ListMoviesResponse, { query: string, page: number, limit: number }>({
            query: ({ query, page, limit }) => ({
                url: `llm/search`,
                method: 'GET',
                params: {
                    query,
                    page: page.toString(),
                    limit: limit.toString(),
                },
            }),
        }),

        getMovieCast: builder.query<Cast[], { movieId: string }>({
            query: ({ movieId }) => ({
                url: `/movies/cast/${movieId}`,
                method: 'GET',
                params: {
                    language: 'en-US',
                },
            }),
        }),

        getLatestTrailers: builder.query<Trailer[], { page: number }>({
            query: ({ page }) => ({
                url: `movies/latest-trailers`,
                method: 'GET',
                params: {
                    page: page.toString(),
                },
            }),
        }),

        getCastDetail: builder.query<Cast, { personId: string }>({
            query: ({ personId }) => ({
                url: `people/${personId}`,
                method: 'GET'
            }),
        }),

        getTrendingMovies: builder.query<ListMoviesResponse, { time: 'day' | 'week', page: number }>({
            query: ({ time, page }) => ({
                url: `movies/trending/${time}`,
                method: 'GET',
                params: {
                    page: page.toString(),
                },
            }),
        }),

        getActingList: builder.query<MovieDetailResponse[], { personId: string, page: number }>({
            query: ({ personId, page }) => ({
                url: `people/acting/${personId}`,
                method: 'GET',
                params: {
                    page: page.toString(),
                },
            }),
        }),


        getLLMiNavigate: builder.query<Navigate, { query: string }>({
            query: ({ query }) => ({
                url: `llm/navigate`,
                method: 'POST',
                body: {
                    query: query,
                },
            }),
        }),
    }),
});

export const {
    useGetMovieDetailQuery,
    useSearchMoviesQuery,
    useGetPopularMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetSimilarMoviesQuery,
    useGetMovieCastQuery,
    useGetCastDetailQuery,
    useLazySearchMoviesQuery,
    useGetLatestTrailersQuery,
    useGetActingListQuery,
    useLazyGetTrendingMoviesQuery,
    useLazyGetLLMMoviesQuery,
    useLazyGetLLMiNavigateQuery,
} = movieApi;

export default movieApi;
