import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPen } from "react-icons/fa";
const EditProfileModal = ({ editProfile, setEditProfile }) => {
  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black transition-all duration-300 ease-in-out ${
        editProfile
          ? "bg-opacity-50 opacity-100 pointer-events-auto"
          : "bg-opacity-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-base-100 shadow-lg border border-gray-400 rounded-md w-[90%] md:w-[800px]  mx-auto flex flex-col relative transform transition-all duration-1000 ease-in-out ${
          editProfile ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className=" bg-[#1f1f1f] text-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="bg-gradient-to-br from-yellow-400 to-pink-500 p-6 md:w-1/3 flex flex-col justify-center items-center text-center">
            <img
              src="https://i.imgur.com/5cLDeiF.png"
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white shadow-md"
            />
            <h2 className="text-xl font-bold mt-4">asdfasdfasfdas</h2>
            <p className="text-white/90 text-md">namansdndfas</p>
          </div>

          {/* Right Section */}
          <div className="md:w-2/3 p-6 flex flex-col gap-4">
            {/* Info Section */}
            <div>
              <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                Information
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between flex-wrap gap-2 mt-3 text-sm text-white/80">
                  <div>
                  <p className="font-semibold text-white">Firstname</p>
                    <input
                      type="text"
                      placeholder="Firstname"
                      className="bg-inherit p-2 border border-gray-300 rounded-md "
                    />
                  </div>
                  <div>
                  <p className="font-semibold text-white">Middlename</p>
                    <input
                      type="text"
                      placeholder="Middlename"
                      className="bg-inherit p-2 border border-gray-300 rounded-md "
                    />
                  </div>
                  <div>
                  <p className="font-semibold text-white">Lastname</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Lastname"
                      className="bg-inherit p-2 border border-gray-300 rounded-md "
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Age</p>
                    <input type="text" className="bg-inherit p-2 border border-gray-300 rounded-md" placeholder="Enter Age"/>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Gender</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About us */}
            <div>
              <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                About us
              </h3>
              {/* {userData?.about && (
                      <p className="mt-3 text-justify">{userData?.about}</p>
                    )} */}
            </div>
            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                Skills
              </h3>
              {/* {userData?.skills && (
                      <p className="mt-3 text-justify">
                        {userData?.skills.map((skill, index) => {
                          return (
                            <button
                              key={index}
                              className="border border-[#b2d8d8] text-[#b2d8d8] px-2 py-1 text-xs rounded-sm mr-2"
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </p>
                    )} */}
            </div>

            {/* Social Icons */}
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
              Socials
            </h3>
            <div className="flex gap-4 mt-auto text-lg text-white/80">
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
