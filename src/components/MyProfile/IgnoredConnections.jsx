import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from "../../utils/constants";
import { addIgnoredConnections, removeIgnoredConnectionAction } from '../../redux/connectionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from "./ProfileModal";  

const IgnoredConnections = () => {
    const [viewProfile, setViewProfile] = useState(false);
    const [targetId, setTargetId] = useState("");
    const [connectionId, setConnectionId] = useState("");
  
  const dispatch = useDispatch();
  const ignoredConnections = useSelector((state) => state.connections.ignoredConnections);
    const getIgnoredConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/connection/getIgnoredConnections', {
                withCredentials: true
            });
            const data = res.data;
            console.log(res);
            dispatch(addIgnoredConnections(data.data));
        } catch (error) {
            console.error(error);
        }
    };
    const removeIgnoredConnection = async (connectionId) => {
        try {
            const res = await axios.post(BASE_URL + '/connection/removeIgnoredConnection/' + connectionId, {}, {
                withCredentials: true
            });
            console.log(res);
            dispatch(removeIgnoredConnectionAction(connectionId));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{
      getIgnoredConnections();
    },[]);
    const handleViewProfile = (id, connectionId) => {
      setViewProfile(true);
      setTargetId(id);
      setConnectionId(connectionId);
    }
    if(!ignoredConnections){
      return <div className="flex flex-col gap-6 items-center my-6">
      <div className="text-2xl font-bold text-center mt-10">
        My Ignored Connections
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border rounded-lg border-slate-400 px-5 py-3 w-[80%] "
        >
          <div className="skeleton w-32 h-32 shrink-0 rounded-full bg-slate-400"></div>
          <div className="flex flex-col gap-3 w-full">
            <div className="skeleton h-3 w-28 bg-slate-400"></div>
            <div className="skeleton h-16 bg-slate-400"></div>
          </div>
        </div>
      ))}
    </div>
        
    }
    return (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-center mt-10">My Ignored Connections</h1>
          <div className="mt-10  flex flex-col gap-5">
            {ignoredConnections.length===0 ? (
              <div className="text-2xl font-bold">No connections ignored </div>
            ) : (
              ignoredConnections.map((connection) => {
                const {connectionId} = connection;
                const {firstName, middleName, lastName, age, gender, about, imageURL, skills, _id} = connection?.user;
                return (
                  <div key={_id} className="w-[700px] bg-base-100 flex gap-6 shadow-sm border border-accent-content rounded-md px-5 py-3">
                    
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
                        <button className="btn btn-sm btn-soft btn-accent"
                          onClick={() => handleViewProfile(_id, connectionId)}
                        >View Profile</button>
                          <button className="btn btn-sm btn-soft btn-error" onClick={() => removeIgnoredConnection(connectionId)}>Remove</button>
                        </div>
                      </div>
    
                      <div>
                        {age && <span>{age} years </span>}
                        {gender && <span>{gender} </span>}
                      </div>
                      <p className="text-sm line-clamp-2">{about} </p>
                      <div className="mt-3">
                        {skills && skills.slice(0,5).map((skill, index) => <button key={index} className="border border-[#b2d8d8] text-[#b2d8d8] px-2 py-1 text-xs rounded-sm mr-2">{skill}</button>)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {viewProfile && <ProfileModal viewProfile={viewProfile} setViewProfile={setViewProfile} targetUserId={targetId} setTargetId={setTargetId} connectionId={connectionId}/>}
        </div>
      );
}

export default IgnoredConnections;