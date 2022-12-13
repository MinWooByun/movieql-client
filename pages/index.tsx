import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      title
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(ALL_MOVIES);

  if (loading) {
    return <h1>Loading...😜</h1>;
  }

  if (error) {
    return <h1>Could not fetch...😢</h1>;
  }

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {data.allMovies.map((movie: any) => {
          return (
            <li key={movie.id}>
              <Link href={`movie/${movie.id}`}>{movie.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
