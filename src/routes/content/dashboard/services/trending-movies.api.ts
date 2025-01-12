import { Paged } from "../../interfaces/common.type";
import movieApi from "../../services/movie.api";

export type TrendingMovieRequest = {
    timeWindow: 'day' | 'week';
    page: number;
}

type MovieDetailResponse = {
    backdrop_path: string;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type TrendingMovieResponse = Paged<MovieDetailResponse>;

const dashboardApi = movieApi.injectEndpoints({
    endpoints: (builder) => ({
        getTrendingMovies: builder.query<TrendingMovieResponse, TrendingMovieRequest>({
            query: ({ timeWindow, page }) => ({
                // url: `3/trending/movie/${timeWindow}`,
                url: `movies/trending/${timeWindow}`,
                method: 'GET',
                params: { page },
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useLazyGetTrendingMoviesQuery,
} = dashboardApi;