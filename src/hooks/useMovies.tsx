import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface MoviesContextProps {
    genres: GenreResponseProps[],
    movies: MovieProps[],
    selectedGenre: GenreResponseProps,
    selectedGenreId: number,
    handleClickButton: (id: number) => void;
}

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
  
  interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }

export const MovieContext = createContext({} as MoviesContextProps);

type MoviesProviderProps = {
    children: ReactNode
}

export function MoviesProvider({children}: MoviesProviderProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
    return (
        <MovieContext.Provider 
            value={{
                genres,
                movies,
                selectedGenre,
                selectedGenreId,
                handleClickButton,
            }}>
            {children}
        </MovieContext.Provider>
    )
}

export function useMovies() {
    const context = useContext(MovieContext);

    const { 
        genres,
        movies,
        selectedGenre,
        selectedGenreId,
        handleClickButton 
    } = context;

    return { 
        genres,
        movies,
        selectedGenre,
        selectedGenreId,
        handleClickButton,
    }
}

    