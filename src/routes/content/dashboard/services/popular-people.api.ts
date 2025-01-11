import { Paged } from "../../interfaces/common.type";
import movieApi from "../../services/movie.api";

type KnownFor = {
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

export type PersonDetailResponse = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    known_for: KnownFor[];
}

export type PopularPeopleRequest = {
    page: number;
}

export type PopularPeopleResponse = Paged<PersonDetailResponse>;

const dashboardApi = movieApi.injectEndpoints({
    endpoints: (builder) => ({
        getPopularPeople: builder.query<PopularPeopleResponse, PopularPeopleRequest>({
            query: ({ page }) => ({
                url: `3/person/popular`,
                method: 'GET',
                params: { page },
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetPopularPeopleQuery,
} = dashboardApi;