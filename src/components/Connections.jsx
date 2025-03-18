import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/getAllConnections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
      getConnections();
  }, []);
  if (!connections)
    return <div className="text-2xl font-bold">No connections found</div>;
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mt-10">My Connections</h1>
      <div className="mt-10  flex flex-col gap-5">
        {connections ? (
          connections.map((connection) => {
            const {firstName, middleName, lastName, age, gender, about, imageURL, skills} = connection
            return (
              <div className="w-[700px] bg-base-100 flex gap-6 shadow-sm border border-accent-content rounded-md px-5 py-3">
                
                 {(imageURL==="" || !imageURL) ? 
                 <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"
                  alt="photo"
                  className="w-32 h-32 shrink-0 object-cover rounded-full" 
                />
                :
                 <img
                    src={imageURL}
                    alt="photo"
                    className="w-32 h-32 shrink-0 object-cover rounded-full" 
                  />}
                <div className="w-full">

                  <div className="flex items-center justify-between">
                    <div>
                      <span className=" font-semibold text-xl">{firstName+" "}</span>
                      { middleName && <span className=" font-semibold text-xl">{middleName+" "}</span>}
                      <span className=" font-semibold text-xl">{lastName}</span>
                    </div>
                    <div className="flex gap-2">
                    <button className="btn btn-sm btn-soft btn-accent">View Profile</button>
                      <button className="btn btn-sm btn-soft btn-error ">Remove</button>
                    </div>
                  </div>

                  <div>
                    {age && <span>{age} years </span>}
                    {gender && <span>{gender} </span>}
                  </div>
                  <p className="text-sm line-clamp-2">{about} </p>
                  <div className="mt-3">
                    {skills && skills.slice(0,5).map((skill) => <button className="border border-[#b2d8d8] text-[#b2d8d8] px-2 py-1 text-xs rounded-sm mr-2">{skill}</button>)}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-2xl font-bold">No connections found</div>
        )}
      </div>
    </div>
  );
};

export default Connections;
