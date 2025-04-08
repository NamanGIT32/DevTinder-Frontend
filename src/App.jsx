import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Feed from "./components/Feed";
import Profile from "./components/MyProfile/Profile";
import Connections from "./components/MyProfile/Connections";
import IgnoredConnections from "./components/MyProfile/IgnoredConnections";
import MyProfile from "./components/MyProfile/MyProfile";
import Chat from "./components/Chat";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            {/* this is a body route and childrens of body route */}
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              {/* <Route path="/chat/:targetUserId" element={<Chat />} /> */}
              <Route path="/profile" element={<MyProfile />}>
                <Route path="" element={<Profile />} />
                <Route path="connections" element={<Connections />} />
                <Route path="ignoredconnections" element={<IgnoredConnections />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
