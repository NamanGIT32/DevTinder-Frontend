import React from 'react'
import { FaUserSecret, FaUsers, FaUsersSlash } from "react-icons/fa";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { useLocation, Link, Outlet } from 'react-router-dom';
import Connections from './Connections';
import IgnoredConnections from './IgnoredConnections';
const MyProfile = () => {
  const location = useLocation();
  return (
    <div className='flex h-screen'>
      <div className='w-[350px] bg-base-300 pt-10 flex flex-col gap-8'>
        <div className='flex items-center gap-4 text-xl cursor-pointer hover:bg-base-100 ml-10 mr-3 px-5 py-3 rounded-md transition-all'><FaUserSecret /> Profile</div>
        <Link to="/profile/connections">
          <div className='flex items-center gap-4 text-xl cursor-pointer hover:bg-base-100 ml-10 mr-3 px-5 py-3 rounded-md transition-all'><FaUsers /> Connections</div>
        </Link>
        <Link to="/profile/ignoredconnections">
          <div className='flex items-center gap-4 text-xl cursor-pointer hover:bg-base-100 ml-10 mr-3 px-5 py-3 rounded-md transition-all'><FaUsersSlash /> Ignored connections</div>
        </Link>
        <div className='flex items-center gap-4 text-xl cursor-pointer hover:bg-base-100 ml-10 mr-3 px-5 py-3 rounded-md transition-all'><RiDeleteBin3Fill/> Delete Account</div>
      </div>
      <div className='flex-1'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MyProfile;