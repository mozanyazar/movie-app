import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailContent from "../components/DetailContent";
import LoadingAnimation from "../components/LoadingAnimation";

const DetailPage = () => {
  const { movieName, movieId } = useParams();
  const [detailMovie, setDetailMovie] = useState({});
  const [loading, setLoading] = useState(false);
  let apiKey = "43eab74a0e3371f45b9f10216d3d2a40";

  const findMovie = async (movieName, movieId) => {
    try {
      let res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`
      );
      const data = await res.json();
      console.log(data.results);

      if (data.results.length > 1) {
        let findMovie = data.results.find((element) => element.id == movieId);
        setDetailMovie([findMovie]);
        setLoading(true);
      } else if (data.results.length == 1) {
        setDetailMovie(data.results);
        setLoading(true);
      }
    } catch (error) {
      console.log("film bulunamadı : ", +error);
    }
  };

  useEffect(() => {
    findMovie(movieName, movieId);
  }, []);

  return (
    <div>
      {loading == false ? (
        <LoadingAnimation />
      ) : (
        <div className="max-w-[1240px] mx-auto w-full ">
          <DetailContent detailMovie={detailMovie} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
