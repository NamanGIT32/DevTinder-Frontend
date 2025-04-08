import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeConnection } from "../../redux/connectionsSlice";
import { FaLinkedinIn, FaLink } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import ViewProfileShimmer from "../Shimmer/ViewProfileShimmer";

const ProfileModal = ({
  viewProfile,
  setViewProfile,
  targetUserId,
  setTargetId,
  connectionId
}) => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const getUserData = async (id) => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile/getTargetUserProfile/" + id,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setUserData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserData(targetUserId);
  }, []);

  const remove = async (connectionId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connection/remove/" + connectionId,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(removeConnection(connectionId));
      handleBack();
    } catch (error) {
      console.error(error);
    }
  };
  const handleBack = () => {
    setViewProfile(false);
    setTargetId("");
  };
  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black transition-all duration-300 ease-in-out ${
        viewProfile
          ? "bg-opacity-50 opacity-100 pointer-events-auto"
          : "bg-opacity-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`px-4 py-2 bg-base-100 shadow-lg border border-gray-400 rounded-md w-[90%] md:w-[700px] mx-auto h-[700px] flex flex-col relative transform transition-all duration-1000 ease-in-out ${
          viewProfile ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center py-2 border-b border-gray-400">
          <div
            className={`text-xl flex items-center gap-3 ${
              userData?.status === "online" ? "text-success" : "text-error"
            } font-semibold`}
          >
            <div
              className={`status-md ${
                userData?.status === "online"
                  ? "status-success"
                  : "status-error"
              } duration-1000 animate-ping rounded-full`}
            ></div>
            <div>{userData?.status} </div>
          </div>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => handleBack()}
          >
            Back
          </button>
        </div>

        {!userData ? (
           <ViewProfileShimmer />
        ) : (
         
           <>
           <div className="flex-1 overflow-y-scroll scrollbar">
             <div className="flex gap-4 mt-5">
               <img
                 className="w-36 h-36 object-cover rounded-full"
                 src={userData?.imageURL}
                 alt=""
               />
               <div className="flex flex-col gap-1 mt-5">
                 <div className="font-semibold text-2xl">
                   <span>{userData?.firstName} </span>
                   <span>{userData?.middleName && userData?.middleName} </span>
                   <span>{userData?.lastName} </span>
                 </div>
                 <div>{userData?.email} </div>
                 <span>
                   {(userData?.age && userData?.age) +
                     " " +
                     (userData?.gender && userData?.gender)}{" "}
                 </span>
               </div>
             </div>
             <div className="mt-5 text-lg text-justify">{userData?.about}</div>
             <div className="my-5">
               {userData?.skills &&
                 userData?.skills.map((skill, index) => (
                   <button
                     key={index}
                     className="border border-[#b2d8d8] text-[#b2d8d8] px-2 py-1 text-xs rounded-sm mr-2"
                   >
                     {skill}
                   </button>
                 ))}{" "}
             </div>
           </div>

           <div className="px-4 border-t border-gray-400 py-4 shadow-inner backdrop-blur-md bg-base-100/70 rounded-b-md">
             <div className="flex justify-between items-center">
               {/* Left side: Social icons */}
               <div className="flex gap-9 text-3xl ">
                 <FaLinkedinIn
                   className="cursor-pointer text-blue-600 transition-all duration-200 
                     hover:text-blue-500 hover:drop-shadow-[0_0_15px_rgba(50,102,194,0.8)]"
                 />
                 <FiGithub
                   className="cursor-pointer text-violet-600 transition-all duration-200 
                 hover:text-violet-400 hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                 />
                 <FaLink
                   className="cursor-pointer text-gray-300 transition-all duration-200 
                 hover:text-gray-200 hover:drop-shadow-[0_0_10px_rgba(156,163,175,0.5)]"
                 />
               </div>

               {/* Right side: Button */}
               <button
                 className="btn btn-soft btn-error text-sm"
                 onClick={() => remove(connectionId)}
               >
                 Remove Connection
               </button>
             </div>
           </div>
         </>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
