import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import { addRequests } from "../redux/requestsSlice";

const getFeed = () => {
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
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, {
        withCredentials: true,
      });
      const data = res.data;
      console.log(res);
      getRequests();
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
        <div className="flex flex-col gap-6 mt-6 ">
          {userRequests &&
            userRequests.map((request) => (
              <div
                key={request.fromUserId._id}
                className="flex justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={request.fromUserId.imageURL}
                    alt="img"
                    className="shrink-0 object-cover rounded-full h-14 w-14 border border-white"
                  />
                  <div className="text-lg">
                    {request.fromUserId.firstName +
                      " " +
                      request.fromUserId.lastName}
                  </div>
                </div>
                <div className="flex items-center gap-3 ">
                  <button className="btn btn-soft btn-success rounded-full h-12 w-12" onClick={()=> reviewRequest("accepted", request._id)}>
                    ✓
                  </button>
                  <button className="btn btn-soft btn-error rounded-full h-12 w-12" onClick={()=> reviewRequest("rejected", request._id)}>
                    ✘
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex items-center justify-center mx-auto">
        {/* card */}
        <div className="card bg-base-300 mx-auto w-96 shadow-sm">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions flex gap-3 items-center">
              <button className="btn btn-primary">Ignored</button>
              <button className="btn btn-primary">Accept</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
