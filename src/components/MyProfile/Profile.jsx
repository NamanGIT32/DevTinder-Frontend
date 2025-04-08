import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";
import EditProfileModal from "./editProfileModal";

const Profile = () => {
  const userData = useSelector((state) => state.user);
  const [editProfile, setEditProfile] = useState(false);
  return (
      <div className="mt-20 w-[90%] md:w-[800px] mx-auto bg-[#1f1f1f] text-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="bg-gradient-to-br from-yellow-400 to-pink-500 p-6 md:w-1/3 flex flex-col justify-center items-center text-center">
          <img
            src="https://i.imgur.com/5cLDeiF.png" // replace with your image
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-white shadow-md"
          />
          <h2 className="text-xl font-bold mt-4">
            {userData?.firstName + " "}
            {userData?.middleName && <span>{userData?.middleName + " "}</span>}
            {userData?.lastName}
          </h2>
          <p className="text-white/90 text-md">{userData?.emailId} </p>
          <FaPen
            className="mt-4 text-white/80 hover:text-white cursor-pointer"
            onClick={() => setEditProfile(!editProfile)}
          />
        </div>

        {/* Right Section */}
        <div className="md:w-2/3 p-6 flex flex-col gap-4">
          {/* Info Section */}
          <div>
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
              Information
            </h3>
            <div className="flex justify-between mt-3 text-sm text-white/80">
              <div>
                <p className="font-semibold text-white">Age</p>
                {userData?.age && <p> {userData?.age} </p>}
              </div>
              <div>
                <p className="font-semibold text-white">Gender</p>
                {userData?.gender && <p> {userData?.gender} </p>}
              </div>
            </div>
          </div>

          {/* About us */}
          <div>
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
              About us
            </h3>
            {userData?.about && (
              <p className="mt-3 text-justify">{userData?.about}</p>
            )}
          </div>
          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
              Skills
            </h3>
            {userData?.skills && (
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
            )}
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
        {editProfile && (
          <EditProfileModal
            editProfile={editProfile}
            setEditProfile={setEditProfile}
          />
        )}
      </div>
  );
};

export default Profile;
