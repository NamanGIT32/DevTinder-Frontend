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
      console.log(res);
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
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      console.log(res);
      dispatch(removeRequest(requestId));
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
      <div className="w-[420px] bg-base-300 p-4 px-6 overflow-y-scroll">
        <h1 className="text-2xl font-semibold">Requests</h1>
        <hr className="mt-2" />
        <Requests userRequests={userRequests} />
      </div>

      <div className="flex items-center justify-center mx-auto ">
        {/* card */}

        {userFeed && <FeedCard {...userFeed[0]} />}
      </div>
    </div>
  );
};

export default Feed;
