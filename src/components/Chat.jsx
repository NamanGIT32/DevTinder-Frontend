import React, { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import emptyMsg from "../assets/images/emptyMsg.png";
import emptyGIF from "../assets/images/emptyGIF.gif";
import EmojiPicker from "emoji-picker-react";

const Chat = ({ targetUserId, isOpen, setIsOpen, setTargetId }) => {
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const EndMessageRef = useRef(null);
  const autoFocusRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [userData, setUserData] = useState();
  const getUserData = async (id) => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile/getTargetUserProfile/" + id,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setUserData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserData(targetUserId);
  }, []);
  const getChats = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/getChat/" + targetUserId, {
        withCredentials: true,
      });
      console.log(res.data);
      const chatMessages = res?.data?.chats?.messages?.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          image: msg?.senderId?.imageURL,
          text: msg?.text,
          id: msg?.senderId?._id,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    //api call to get chats
    getChats();

    socket.on("messageReceived", ({ firstName, image, text, id }) => {
      console.log(firstName + ", user id: " + id + " text: " + text);
      setMessages((messages) => [...messages, { firstName, image, text, id }]);
    });
    socket.on("errorMessage", (data) => {
      console.error(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      image: user?.imageURL,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleBack = () => {
    setIsOpen(false);
    setTargetId("");
  };

  useEffect(() => {
    EndMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    autoFocusRef?.current?.focus();
  }, []);

  return (
    <div
      className={`fixed inset-0 -top-32 flex items-center justify-center bg-black transition-all duration-300 ease-in-out ${
        isOpen
          ? "bg-opacity-50 opacity-100 pointer-events-auto"
          : "bg-opacity-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-base-100 shadow-lg border border-gray-400 rounded-md w-[90%] md:w-[700px] mx-auto h-[600px] flex flex-col relative transform transition-all duration-1000 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center border-b border-gray-400 p-2">
          <div className="flex gap-3 cursor-pointer">
            <img
              src={userData?.imageURL}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
            <div className="font-semibold text-md">
              {" "}
              {userData?.firstName + " " + userData?.lastName}{" "}
            </div>
            <div className={`${userData?.status === "online" ? "text-green-500" : "text-red-500"}`}>{userData?.status} </div>

            </div>
          </div>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => handleBack()}
          >
            Back
          </button>
        </div>

        <div className="overflow-y-auto overflow-x-hidden flex-1 p-2 scrollbar bg-chat">
          {!messages ? (
            <div
              className="flex items-center justify-center mt-20"
              style={{
                filter: "drop-shadow(0 6px 4px rgba(34, 197, 94, 0.5))",
              }}
            >
              <DotLottieReact
                src="https://lottie.host/eeee5726-eb6a-4229-b5a4-ec8e3dd68461/9ELoJRdj4m.lottie"
                loop
                autoplay
              />
            </div>
          ) : (
            messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`chat ${
                    userId === message.id ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img alt="img" src={message?.image} />
                    </div>
                  </div>
                  <div className="chat-bubble break-words whitespace-pre-wrap max-w-sm ">
                    {message?.text}
                  </div>
                </div>
              );
            })
          )}
          {/* 👇 This ref makes it scroll to bottom */}
          <div ref={EndMessageRef} />
        </div>
        <div className="flex items-center justify-between gap-3 p-2 border-t border-gray-400 overflow-hidden">
          <input
            type="text"
            placeholder="Type message here"
            className="input input-primary focus:outline-none w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            ref={autoFocusRef}
          />
          {/* <div className="relative" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            Emoji
            {showEmojiPicker && (
          <div className="absolute z-50 -bottom-64 left-0 ">

            <EmojiPicker className=""
              onEmojiClick={(emoji) => {
                setNewMessage(newMessage + emoji.emoji);
              }}
            />
          </div>
            )} 
          </div>*/}
          <button className="btn btn-primary" onClick={() => sendMessage()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
