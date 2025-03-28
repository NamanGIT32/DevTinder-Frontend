import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import { addRequests, removeRequest } from "../redux/requestsSlice";
import FeedCard from "./FeedCard";
import Requests from "./Requests";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((state) => state.feed);
  const userRequests = useSelector((state) => state.requests);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      const data = res.data;
      dispatch(addFeed(res.data.data));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/getAllRequests", {
        withCredentials: true,
      });
      const data = res.data;
      dispatch(addRequests(res.data.data));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
    getRequests();
  }, []);

  return (
    <div className="flex h-screen ">
      {/* sidebar */}
      <div className="w-[420px] bg-base-300 p-4 px-6 overflow-y-scroll scrollbar ">
        <h1 className="text-2xl font-semibold">Requests</h1>
        <hr className="mt-2" />
        <Requests userRequests={userRequests} />
      </div>

      <div className="mx-auto mt-20">
        {/* card */}

        {userFeed && userFeed.length!==0 ? <FeedCard {...userFeed[0]} /> : <div className="text-2xl flex items-center justify-center text-semibold">Feed is empty!!</div>}
      </div>
    </div>
  );
};

export default Feed;