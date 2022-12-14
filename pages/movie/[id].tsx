import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
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
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(-45deg, #d754ab, #fd723a)",
        }}
      >
        <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>Loading...😜</h1>
      </div>
    );
  }

  return (
    <div className="Container">
      <div className="Column">
        <h1 className="Title">{loading ? "Loading..." : `${data.movie?.title}`}</h1>
        <span className="Subtitle">⭐️ {data?.movie?.rating}</span>
      </div>
      <Image src={data.movie.medium_cover_image} alt={"image"} width={400} height={550} className="Image" />
    </div>
  );
};

export default Movie;
