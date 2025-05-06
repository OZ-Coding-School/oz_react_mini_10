import MovieCard from "@components/MovieCard";

const MovieCardsContainer = ({ movieListData }) => {
  return (
    <section className="grid w-fit grid-cols-2 gap-2 pb-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movieListData?.map((movieData) => (
        <MovieCard key={movieData.id} {...movieData} />
      ))}
    </section>
  );
};
export default MovieCardsContainer;
