import { async } from "@firebase/util";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import DetailComments from "../components/DetailComments";
import DetailContent from "../components/DetailContent";
import LoadingAnimation from "../components/LoadingAnimation";
import { UserAuth } from "../store/AuthContext";

const DetailPage = () => {
  const { movieName, movieId } = useParams();
  const { user, watchList } = UserAuth();
  const [detailMovie, setDetailMovie] = useState({});
  const [loading, setLoading] = useState(false);

  let apiKey = "43eab74a0e3371f45b9f10216d3d2a40";
  const findMovie = async (movieName, movieId) => {
    try {
      let res = await fetch(
        // `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${movieName}&page=1`
      );
      const data = await res.json();
      if (data.results.length > 1) {
        let filteredMovie = data.results.find(
          (element) => element.id == movieId
        );
        setDetailMovie([filteredMovie]);
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
  }, [watchList]);

  return (
    <div>
      {loading == false ? (
        <LoadingAnimation />
      ) : (
        <div className="max-w-[1240px] mx-auto w-full ">
          <DetailContent detailMovie={detailMovie} />
          <DetailComments movieId={movieId} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
