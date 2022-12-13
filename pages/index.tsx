import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

const Home = () => {
  const [movies, setMovies] = useState<any>([]);
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              id
              title
            }
          }
        `,
      })
      .then((results) => setMovies(results.data.allMovies));
  }, [client]);

  return (
    <div>
      <h1>
        {movies.map((movie: any) => {
          return <ul key={movie.id}>{movie.title}</ul>;
        })}
      </h1>
    </div>
  );
};

export default Home;
