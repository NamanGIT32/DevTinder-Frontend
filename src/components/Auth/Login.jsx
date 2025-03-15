import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {addUser} from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitDetails = async () => {
    try {
      const res = await axios.post(BASE_URL + "/auth/login",{
        emailId: email,
        password:password
      }, {
        withCredentials: true,
      });
      console.log(res);
      const data = res.data.data;
      dispatch(addUser(data));
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center my-16">
    <div className="card card-dash bg-[#4cb7f8] w-96">
      <div className="card-body">
        <h2 className="card-title text-center">Login</h2>
        <input type="text" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
        <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}  />
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={submitDetails} >login</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
