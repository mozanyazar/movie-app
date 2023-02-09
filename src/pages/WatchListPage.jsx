import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import WatchListUserExist from "../components/WatchListUserExist";
import { UserAuth } from "../store/AuthContext";

const WatchListPage = () => {
  const { user } = UserAuth();

  return (
    <div
      style={{ height: "calc(100vh - 78px)" }}
      className=" max-w-[1240px] mx-auto"
    >
      {user ? <WatchListUserExist /> : <Navigate to='/' />}
    </div>
  );
};

export default WatchListPage;
