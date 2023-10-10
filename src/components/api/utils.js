export const tmdbApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzk2MDgzODllNGRmMDM4M2MwYmU5OWVjZGQ0M2E3OCIsInN1YiI6IjY0ZmUyYWEzNDU1N2EwMDBlMzY4M2I0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f9WgZG0mps3Ftbnz4JU7W20bI0Zo-rdgc13vgdhD0ZQ';
export const latest = `https://api.themoviedb.org/3/trending/all/day?language=en-US`;
export const some = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc`
export const tmdbHeaders = {
    Authorization: `Bearer ${tmdbApiKey}`,
    accept: 'application/json',
};
export const streamingHeaders = {
    'X-RapidAPI-Key': '2062d37f92msh907d57ddb0ecb01p1ce5dfjsn9d13e1d56a5d',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
}