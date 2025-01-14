import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aiConfig } from '../../../app/env';

const aiApiReducerPath = 'aiApi';

export type AiQueryRequest = {
    query: string;
    collection_name: string;
    amount?: number;
    threshold?: number;
};

export type AiResponse = {
    results: string[];
};

const customQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const geminiApiKey = aiConfig.apiKey;
    const baseUrl = aiConfig.baseUrl;

    if (!geminiApiKey || !baseUrl) {
        throw new Error('API key or Base URL is missing.');
    }
    if (typeof args === 'string') {
        args = appendQueryStringParam(args, 'llm_api_key', geminiApiKey);
    } else {
        args = appendQueryStringParam(args.url, 'llm_api_key', geminiApiKey);
    }

    return await fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        },
    })(args, api, extraOptions);
};

function appendQueryStringParam(url: string, key: string, value: string): string {
    if (url.indexOf('?') < 0) {
        url += '?';
    } else {
        url += '&';
    }
    url += `${key}=${value}`;
    return url;
}

const aiApi = createApi({
    reducerPath: aiApiReducerPath,
    baseQuery: customQuery,
    endpoints: (builder) => ({
        // Endpoint để thực hiện truy vấn với Gemini API
        searchAi: builder.query<AiResponse, AiQueryRequest>({
            query: ({ query, collection_name, amount = 10, threshold = 0.5 }) => {
                const queryString = new URLSearchParams({
                    query: query,
                    collection_name: collection_name,
                    amount: amount.toString(),
                    threshold: threshold.toString(),
                }).toString();

                return {
                    url: `/retriever?${queryString}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useSearchAiQuery,
} = aiApi;

export default aiApi;
