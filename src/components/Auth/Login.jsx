import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitLoginDetails = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/login",
        {
          emailId: email,
          password: password,
          status: "online"
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      const data = res.data.data;
      dispatch(addUser(data));
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      console.error(error);
    }
  };
  const submitSignupDetails = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/signup",
        {
          emailId: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          status: "online"
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      const data = res.data.data;
      dispatch(addUser(data));
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.error);
      console.error(error);
    }
  };
  return (
    <div className="gradient-bg ">
      <div className="flex justify-center items-center pt-32">
        <div className="card card-dash bg-base-200 w-96">
          <div className="card-body">
            <h2 className="font-semibold text-2xl text-center">
              {login ? "Login" : "Signup"}
            </h2>

            {error !== "" && <div className="text-red-400">{error}</div>}

            {!login && (
              <>
                <div className="mt-2">
                  <label>Firstname</label>
                  <input
                    className="input focus:outline-none border focus:border-success"
                    type="text"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label>Lastname</label>
                  <input
                    className="input focus:outline-none border focus:border-success"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="mt-3">
              <label htmlFor="email">Email</label>
              <input
                className="input focus:outline-none border focus:border-success"
                type="text"
                name="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password">Password</label>
              <input
                className="input focus:outline-none border focus:border-success"
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="card-actions justify-center mt-5">
              <button
                className="btn btn-primary"
                onClick={login ? submitLoginDetails : submitSignupDetails}
              >
                {login ? "login" : "signup"}{" "}
              </button>
            </div>

            {login ? (
              <div>
                New user!!{" "}
                <span
                  className="cursor-pointer text-[#91bbf9] underline mt-4"
                  onClick={() => setLogin(false)}
                >
                  Signup
                </span>
              </div>
            ) : (
              <div>
                Already have an account!!{" "}
                <span
                  className="cursor-pointer text-[#91bbf9] underline mt-4"
                  onClick={() => setLogin(true)}
                >
                  Login
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
