export function toTmdbImageUrl(path: string | null) {
    return `https://image.tmdb.org/t/p/w500${path}`;
}