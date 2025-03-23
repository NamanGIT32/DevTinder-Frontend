import React from "react";
import { removeRequest } from "../redux/requestsSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
const Requests = ({ userRequests }) => {
  const dispatch = useDispatch();
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
  if (!userRequests) {
    return (
      <div className="flex flex-col gap-6 items-center my-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="skeleton h-14 w-14 shrink-0 rounded-full bg-slate-400"></div>
            <div className="flex flex-col gap-3">
              <div className="skeleton h-3 w-28 bg-slate-400"></div>
              <div className="skeleton h-4 w-40 bg-slate-400"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (userRequests.length === 0) {
    return (
      <div className="text-center font-semibold text-xl mt-4">
        {" "}
        All good!! No pending request
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 mt-6 ">
      {userRequests &&
        userRequests.map((request) => (
          <div key={request.fromUserId._id} className="flex justify-between">
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
              <button
                className="btn btn-soft btn-success rounded-full h-12 w-12"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                ✓
              </button>
              <button
                className="btn btn-soft btn-error rounded-full h-12 w-12"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                ✘
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Requests;
