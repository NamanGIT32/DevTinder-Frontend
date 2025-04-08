import axios from "axios";
import React from "react";
import { FaUserSecret, FaUsers, FaUsersSlash } from "react-icons/fa";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
const MyProfile = () => {
  const navigate = useNavigate();
  const deleteAccount = async () => {
    try {
      const res = await axios.delete(BASE_URL + '/user/deleteAccount', {
        withCredentials: true
      });
      const data = res.data;
      console.log(res);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-[350px] bg-base-300 pt-10 flex flex-col gap-8">
        <Link to="/profile">
          <div className="flex items-center gap-4 text-xl cursor-pointer hover:bg-base-100 ml-10 mr-3 px-5 py-3 rounded-md transition-all">
            <FaUserSecret /> Profile
          </div>
        </Link>
        <Link to="/profile/connections">
          <div className="flex items-center gap-4 text-xl cursor-pointer hover:bg-base-100 ml-10 mr-3 px-5 py-3 rounded-md transition-all">
            <FaUsers /> Connections
          </div>
        </Link>
        <Link to="/profile/ignoredconnections">
          <div className="flex items-center gap-4 text-xl cursor-pointer hover:bg-base-100 ml-10 mr-3 px-5 py-3 rounded-md transition-all">
            <FaUsersSlash /> Ignored connections
          </div>
        </Link>
        <div
          className="flex items-center gap-4 text-xl cursor-pointer hover:bg-base-100 ml-10 mr-3 px-5 py-3 rounded-md transition-all"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          <RiDeleteBin3Fill /> Delete Account
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Alert!!</h3>
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn rounded-full shrink-0 text-xl"><IoMdClose /></button>
                </form>
              </div>
             
              <p className="py-4">
                Are you sure you want to delete this account
              </p>
              <div className="modal-action">
              <button className="btn btn-error" onClick={() => deleteAccount()} >Delete</button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MyProfile;
