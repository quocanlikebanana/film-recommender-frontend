import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tmdbConfig } from '../../../app/env';
import { Country, SpokenLanguage } from '../interfaces/movie.interface'

const tmdbApiReducerPath = 'tmdbApi';

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

const tmdbApi = createApi({
    reducerPath: tmdbApiReducerPath,
    baseQuery: customQuery,
    endpoints: (builder) => ({
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
    }),
});

export const {
    useGetCountryQuery,
    useGetPrimaryTranslationsQuery,
    useGetLanguageQuery,
} = tmdbApi;

export default tmdbApi;
