import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

const Movie = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(GET_MOVIE, {
    // 이 부분은 client에서 server로 변수를 보내는 부분이다.
    // 변수를 필요로 하는 쿼리로 변수를 보내는 방법이다.
    variables: {
      // 변수명은 쿼리의 변수명과 똑같아야 한다.
      movieId: id,
    },
  });

  if (loading) {
    return <h1>Loading...😜</h1>;
  }

  return (
    <div>
      <h1>{data.movie.title}</h1>
    </div>
  );
};

export default Movie;
