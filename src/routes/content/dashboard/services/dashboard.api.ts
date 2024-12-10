import { MovieDetailResponse, Paged } from "../../interfaces/movie.interface";
import protectedApi from "../../services/protectedApi";

interface TrendingRequest {
    timeWindow: 'day' | 'week';
    page: number;
}

const dashboardApi = protectedApi.injectEndpoints({
    endpoints: (builder) => ({
        getTrendingMovies: builder.query<Paged<MovieDetailResponse>, TrendingRequest>({
            query: ({ timeWindow, page }) => ({
                url: `trending/movie/${timeWindow}`,
                method: 'GET',
                params: { page },
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetTrendingMoviesQuery,
    useLazyGetTrendingMoviesQuery,
} = dashboardApi;