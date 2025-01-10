import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tmdbConfig } from '../../../app/env';
import { Country, MovieDetailResponse, SpokenLanguage } from '../interfaces/movie.interface'
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

export type SearchMoviesResponse = Paged<MovieDetailResponse>;


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

        getLanguage: builder.query<SpokenLanguage[], object>({
            query: () => ({
                url: `3/configuration/languages`,
                method: 'GET',
            }),
        }),

        getCountry: builder.query<Country[], object>({
            query: () => ({
                url: `3/configuration/countries`,
                method: 'GET',
            }),
        }),

        getPrimaryTranslations: builder.query<string[], object>({
            query: () => ({
                url: `3/configuration/primary_translations`,
                method: 'GET',
            }),
        }),

        searchMovies: builder.query<SearchMoviesResponse, SearchMoviesMovieRequest>({
            query: (params) => {
                const queryString = new URLSearchParams({
                    query: params.query,
                    include_adult: params.include_adult?.toString() || 'false',
                    language: params.language || 'en-US',
                    primary_release_year: params.primary_release_year || '',
                    page: params.page?.toString() || '1',
                    region: params.region || '',
                    year: params.year || '',
                }).toString();

                return {
                    url: `3/search/movie?${queryString}`,
                    method: 'GET',
                };
            },
        }),

    }),
});

export const {
    useGetMovieDetailQuery,
    useSearchMoviesQuery,
    useGetLanguageQuery,
    useGetCountryQuery,
    useGetPrimaryTranslationsQuery,
} = movieApi;

export default movieApi;
