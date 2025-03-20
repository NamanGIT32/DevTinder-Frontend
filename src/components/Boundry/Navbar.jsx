import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import {removeUser} from "../../redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const res = await axios.post(BASE_URL + "/auth/logout", {}, {
        withCredentials: true
      })
      dispatch(removeUser());
      navigate("/login");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar bg-success-content shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">{"< " +"DevTalk"+ " />"}</Link>
  </div>
  {user ?  
  <div className="flex gap-2 items-center">
    <div>Hello!! {user.firstName}</div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.imageURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><a onClick={()=>handleLogout()}>Logout</a></li>
      </ul>
    </div>
  </div> :
  <Link to='/login' className='btn btn-primary'>
    Login
  </Link>
  }
</div>
  )
}

export default Navbar