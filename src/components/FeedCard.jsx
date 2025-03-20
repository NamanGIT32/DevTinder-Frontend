import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/feedSlice";

const FeedCard = ({
  _id,
  firstName,
  lastName,
  middleName,
  age,
  gender,
  about,
  imageURL,
  skills,
}) => {
  const dispatch = useDispatch();
  const sendRequest = async (status, userId) => {
    try {
      const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + userId, {}, {
        withCredentials: true
      });
      console.log(res);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex items-center gap-6">
      
      <button className="btn btn-error rounded-full h-16 w-16 text-2xl"
        onClick={()=> sendRequest("ignored", _id)}
      >
        ✘
      </button>
      <div className=" bg-base-300 mx-auto w-96 shadow-lg rounded-md">
        <img
          src={imageURL}
          alt="Shoes"
          className="w-full shrink-0 object-cover"
        />
        <div className="card-body">
          <h1 className="text-xl font-semibold">
            {firstName + " " + lastName}
          </h1>
          <p>{about && about}</p>
          <div className="mt-3">
            {skills &&
              skills.slice(0, 3).map((skill, index) => (
                <button
                  key={index}
                  className="border border-[#b2d8d8] text-[#b2d8d8] px-2 py-1 text-xs rounded-sm mr-2"
                >
                  {skill}
                </button>
              ))}
          </div>
        </div>
      </div>
      <button className="btn btn-success rounded-full h-16 w-16 text-3xl"
        onClick={()=> sendRequest("interested", _id)}
      >
        ✓
      </button>
    </div>
  );
};

export default FeedCard;
