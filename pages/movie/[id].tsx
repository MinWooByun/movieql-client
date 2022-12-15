import { gql, useQuery } from "@apollo/client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

const Movie = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
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

  // apollo cache에 저장하는 방법
  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        # fragment(필수) MovieFragment(짓고 싶은 이름 아무거나) on(필수) Moive(수정해주고 싶은 타입(필수)) {}
        fragment MovieFragment on Movie {
          # 변경하고 싶은 오브젝트들을 넣어준다.
          isLiked
        }
      `,
      // 변경할 값을 넣어준다.
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };

  return (
    <div className="Container">
      <Link href={"/"}>
        <button
          style={{
            border: "none",
            padding: "10px 20px",
            backgroundColor: "white",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "20px",
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </Link>
      <div className="Column">
        <h1 className="Title">{loading ? "Loading..." : `${data.movie?.title}`}</h1>
        <h1 className="Subtitle">⭐️ {data?.movie?.rating}</h1>
        <button
          style={{
            marginTop: "10px",
            border: "none",
            backgroundColor: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={onClick}
        >
          {data?.movie?.isLiked ? "Unlike" : "Like"}
        </button>
      </div>
      <Image src={data.movie.medium_cover_image} alt={"image"} width={400} height={550} className="Image" />
    </div>
  );
};

export default Movie;
