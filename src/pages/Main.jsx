import MovieCard from "../components/moviecard"

const sampleMovies = [
  {
    id: 1011985,
    poster_path: "/1ZNOOMmILNUzVYbzG1j7GYb5bEV.jpg",
    title: "쿵푸팬더 4",
    vote_average: 7.1
  },
]

export default function MainPage() {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {sampleMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
