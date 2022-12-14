import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      title
      medium_cover_image
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(ALL_MOVIES);

  return (
    <div className="Main_Container">
      <header className="Header">
        <h1 className="Main_Title">Apollo Movies</h1>
      </header>
      {loading && <div className="Loading">Loading...😜</div>}
      <div className="MovieGrid">
        {data?.allMovies?.map((movie: any) => (
          <>
            <div key={movie.id} className="PosterContainer">
              <Link href={`movie/${movie.id}`}>
                <Image src={movie.medium_cover_image} alt="image" width={400} height={550} className="Poster" />
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
