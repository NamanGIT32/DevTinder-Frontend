import React, { useEffect } from 'react'
import Navbar from './components/Boundry/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from './utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './redux/userSlice'
const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {withCredentials: true});
      const data = res.data;
      dispatch(addUser(data.data))
    } catch (error) {
      if(error.status === 401){
        navigate('/login');
      }
      console.error(error);
    }
  }
  useEffect(()=>{
    if(!user){
      fetchUser();
    }
  },[]);
  return (
    <div>
        <Navbar/>
        <div className='pt-16'>
          <Outlet/>
        </div>
        
    </div>
  )
}

export default Body;