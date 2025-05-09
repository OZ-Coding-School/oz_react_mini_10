const Genres = ({ genres }) => {
  return (
    <div className="flex gap-4">
      {genres?.map(({ id, name }) => (
        <span
          className="rounded-2xl border-2 border-gray-100 p-2 text-sm break-keep"
          key={id}
        >
          {name}
        </span>
      ))}
    </div>
  );
};
export default Genres;
