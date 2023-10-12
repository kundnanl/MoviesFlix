import { latest, some, tmdbHeaders } from './utils';

export async function fetchLatestMovies() {
  try {
    const response = await fetch(latest, {
      headers: tmdbHeaders,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    return [];
  }
}

export async function fetchSomeMovies() {
  try {
    const response = await fetch(some, {
      headers: tmdbHeaders,
    });

    if(!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error Fetching some Movies ${error}`);
    return[]
  }
}

export async function fetchStreamingAvailability(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, {headers: tmdbHeaders},
    );

    const streamingInfo = await response.json();
    console.log(streamingInfo.results.CA.link);
    return streamingInfo.results.CA.link;
  } catch (error) {
    console.error('Error fetching streaming availability:', error);
    return null;
  }
}


export async function fetchSearchmovies(searchText) {
  try{
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchText}&include_adult=false&language=en-US&page=1`, {headers: tmdbHeaders},
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data.results.slice(0,2))
    return data.results;
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    return [];
  }
}

export async function fetchMovies() {
  try{
    console.log("fetching movies")
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US`, {headers: tmdbHeaders},
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    console.log(`these are fetched movies${[data.results.slice(0,2)]}`)
    console.log(data.results.slice(0,2));
    return data.results;
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    return [];
  }
}

export async function fetchShows() {
  try {
    console.log("Fetching TV Shows");
    const response = await fetch (
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US`, {headers: tmdbHeaders},
    );
    
    if (!response.ok) {
      throw new Error('Network Response for TV Shows was Not okay');
    }

    const data = await response.json();

    return data.results;
  } catch(error) {
    console.error(error);
    return [];
  }
}