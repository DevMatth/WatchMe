import { MovieCard } from "./MovieCard";
import { useMovies } from "../hooks/useMovies";

import '../styles/content.scss'
import { Header } from "./Header";

export function Content() {

  const { movies } = useMovies()

  return (
    <div className="container" >
      <Header />

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
)
}