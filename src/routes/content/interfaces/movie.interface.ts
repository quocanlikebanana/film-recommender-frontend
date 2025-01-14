// Interface cho từng thành phần nhỏ
interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface UserTracking {
    is_favorite: boolean;
    is_watchlist: boolean;
    is_rated: boolean;
    score_rated: number;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Country {
    english_name: string;
    iso_3166_1: string;
    name: string;
}


export interface MovieDetailResponse {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: null | object;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface ReviewAuthorDetails {
    name: string | null;
    username: string;
    avatar_path: string | null;
    rating: number;
}

export interface Review {
    author: string;
    author_details: ReviewAuthorDetails;
    content: string;
    created_at: string;
    id: string;
}

export interface Cast {
    adult: boolean;
    gender: number;
    tmdb_id: number | null;
    _id: string | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    also_known_as: string[];
    order: number;
    biography: string;
    deathday: string | null;
    birthday: string;
    homepage: string | null;
    imdb_id: string;
    place_of_birth: string;
}

export interface Trailer {
    iso_639_1: string;       // Language code
    iso_3166_1: string;      // Country code
    name: string;            // Video title
    key: string;             // YouTube video key
    site: string;            // Video platform
    size: number;            // Video resolution
    type: string;            // Video type (e.g., Trailer)
    official: boolean;       // Whether it is an official video
    published_at: string;    // Publish date in ISO format
    id: string;              // Unique video identifier
    link: string;            // Direct link to the video
}





