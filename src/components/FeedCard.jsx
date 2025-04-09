import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/feedSlice";
import { motion, useMotionValue, useTransform } from "framer-motion";

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
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
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
<motion.div
      className=""
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(event, info) => {
        if (info.offset.x > 300) {
          console.log("Swiped right ✅");
          sendRequest("interested", _id)
        } else if (info.offset.x < -300) {
          console.log("Swiped left ❌");
          sendRequest("ignored", _id);
        } else {
          // Animate back to center
          x.set(0);
        }
      }}
    >

    <div className="flex items-center gap-6 ">
      
      <button className="btn btn-error rounded-full h-16 w-16 text-2xl"
        onClick={()=> sendRequest("ignored", _id)}
      >
        ✘
      </button>
      <div className="w-96 shadow-lg rounded-md h-[600px] bg-[#16191e] overflow-y-scroll scrollbar">
        <img
          src={imageURL}
          draggable={false}
          alt="img"
          className="w-full shrink-0 object-cover h-[450px]"
        />
        <div className="mt-4 px-3 pb-3">
          <h1 className="text-xl font-semibold my-4">
            {firstName + " " + lastName}
          </h1>
          <p className="line-clamp-4">{about && about}</p>
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
    </motion.div>
  );
};

export default FeedCard;
