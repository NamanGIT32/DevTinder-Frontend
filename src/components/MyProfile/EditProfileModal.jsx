import axios from "axios";
import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaLink, FaPen, FaCross } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";


import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { BASE_URL } from "../../utils/constants";
const EditProfileModal = ({ editProfile, setEditProfile, user }) => {
  const [userSkills, setUserSkills] = useState(user?.skills);
  const [skill, setSkill] = useState("");
  const [userFormData, setUserFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    middleName: !user?.middleName ? "" : user?.middleName,
    age: user?.age ? user?.age : "",
    about: user?.about ? user?.about : "",
    gender: user?.gender ? user?.gender : "",
    image: user?.imageURL,
    email: user?.emailId,
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const removeSkill = (index) => {
  }
  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: userFormData?.firstName,
          middleName: userFormData?.middleName,
          lastName: userFormData?.lastName,
          age: userFormData?.age,
          gender: userFormData?.gender,
          about: userFormData?.about,
          imageURL: userFormData?.image,
          emailId: userFormData?.email,
          skills: userSkills,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(addUser(res.data.data));
      setEditProfile(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black transition-all duration-300 ease-in-out ${
        editProfile
          ? "bg-opacity-50 opacity-100 pointer-events-auto"
          : "bg-opacity-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-base-100 shadow-lg border border-gray-400 rounded-md w-[90%] md:w-[900px] h-[80%] overflow-y-scroll scrollbar-custom mx-auto flex flex-col relative transform transition-all duration-1000 ease-in-out ${
          editProfile ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="bg-[#0f0f0f] text-white flex flex-col md:flex-row font-sans">
          {/* Left Panel */}
          <div className=" md:w-1/3 bg-gradient-to-br from-[#064E3B] via-[#0F766E] to-[#0F172A] p-6 flex flex-col justify-between rounded-br-3xl md:rounded-br-none md:rounded-r-3xl">
            <div className="text-center flex flex-col items-center gap-2">
              <img
                src={userFormData?.image}
                alt="Profile"
                className="w-32 h-32 object-cover object-center shrink-0 rounded-xl shadow-lg"
              />
              <h2 className="text-xl font-bold text-white mt-4">
                {userFormData?.firstName + " "}{" "}
                {userFormData?.middleName && (
                  <span>{userFormData.middleName + " "} </span>
                )}{" "}
                {userFormData?.lastName}{" "}
              </h2>
              <p className="text-white/80 text-sm">{userFormData?.email} </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:w-2/3 w-full p-6 md:p-12 ">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
              <button className="btn" onClick={() => setEditProfile(false)}>
                Back
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm mb-1 block">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#2c2c2c] border border-[#36746e] rounded-md"
                  name="firstName"
                  value={userFormData?.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Middle Name</label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#2c2c2c] border border-[#36746e] rounded-md"
                  name="middleName"
                  value={userFormData?.middleName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#2c2c2c] border border-[#36746e] rounded-md"
                  name="lastName"
                  value={userFormData?.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm mb-1 block">Age</label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#2c2c2c] border border-[#36746e] rounded-md"
                  name="age"
                  value={userFormData?.age}
                  onChange={handleChange}
                />
              </div>
              <fieldset className="fieldset -mt-3">
                <legend className="fieldset-legend text-sm block">
                  Gender
                </legend>
                <select
                  defaultValue={userFormData?.gender}
                  name="gender"
                  onChange={handleChange}
                  className="select w-full p-2 bg-[#2c2c2c] border border-[#36746e]  rounded-md"
                >
                  <option disabled={true}>Choose gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
            </div>

            <div className="mb-4">
              <label className="text-sm mb-1 block">Email</label>
              <input
                type="email"
                className="w-full p-2 bg-[#2c2c2c] border border-[#36746e] rounded-md"
                name="email"
                value={userFormData?.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm mb-1 block">About Us</label>
              <textarea
                rows="3"
                className="w-full p-2 bg-[#2c2c2c] border border-[#36746e]  rounded-md scrollbar"
                name="about"
                value={userFormData?.about}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <div>
                <label className="text-sm mb-1 block">Skills</label>
                <input
                  type="text"
                  value={skill}
                  onChange={(e)=> setSkill(e.target.value)}
                  onKeyDown={(e)=> {
                    if(e.key==="Enter" && skill.trim()!==""){
                      setUserSkills((prev)=> [...prev, skill])
                      setSkill("")
                    } 
                  }}
                  placeholder="Type your skill"
                  className="w-full p-2 bg-[#2c2c2c] border border-[#36746e] rounded-md"
                  name="skill"
                />
              </div>
              {userSkills.length !== 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {userSkills?.map((skill, index) => {
                    return (
                      <div
                        key={index}
                        className="flex gap-2 border border-[#b2d8d8] text-[#b2d8d8] px-2 py-1 text-xs rounded-sm"
                      >
                        {skill}
                        <CiCircleRemove className="text-xl" 
                        onClick={removeSkill(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 mb-3">
              <input
                type="text"
                placeholder="Image URL"
                className="w-full p-2 bg-[#2c2c2c] border border-[#36746e] rounded-md"
                name="image"
                value={userFormData?.image}
                onChange={handleChange}
              />
            </div>
            <button className="btn bg-[#36746e] hover:bg-[#24474c] transition-all" onClick={updateProfile}>
              Update
            </button>

            {/* <div className="mb-4">
          <label className="text-sm mb-1 block">Socials</label>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
