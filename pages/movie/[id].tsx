import { useRouter } from "next/router";

const Movie = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>The id of that movie is {id}</h1>
    </div>
  );
};

export default Movie;
