import React, { useContext, useEffect, useState } from "react";
import {
  coder0,
  coder1,
  coder2,
  coder3,
  coder4,
  coder5,
  coder6,
} from "../../assets/avatars";
import { CoderContext } from "../../context/CoderProvider";
import axios from "axios";

const avatarOptions = {
  coder0: coder0,
  coder1: coder1,
  coder2: coder2,
  coder3: coder3,
  coder4: coder4,
  coder5: coder5,
  coder6: coder6,
};

export default function Profile() {
  const { coder, setCoder, loading } = useContext(CoderContext);
  const [selectedAvatar, setSelectedAvatar] = useState(coder?.avatar || "coder0");
  const [showOptions, setShowOptions] = useState(false);
  const [numOfCodes, setNumOfCodes] = useState(0);

  if (loading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    const fetchAllCodes = async () => {
      try {
        console.log("hatttttt:", coder?.avatar)
        const res = await axios.get("http://localhost:3000/get/allcodes", {
          withCredentials: true,
        });
        setNumOfCodes(res.data.codes.length);
      } catch (error) {
        console.log(error);
        throw error
      }
    };
    fetchAllCodes();
  }, []);

  useEffect(() => {
    if (coder?.avatar) {
      setSelectedAvatar(coder.avatar);
    }
  }, [coder]);

  const saveAvatar = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/get/update-avatar",
        { avatar: selectedAvatar },
        { withCredentials: true }
      );
      setCoder(res.data.coder);
      console.log(res.data.coder)
      setSelectedAvatar(res.data.coder.avatar);
      console.log("coder ",coder)
      setShowOptions(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-10">
      <div
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 
        text-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl 
        transition-all duration-300 hover:shadow-3xl"
      >
        <div className="flex flex-col items-center mb-8 relative">
          <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-blue-500">
            <img
              src={avatarOptions[selectedAvatar]}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>

          <button
            className="mt-4 bg-white/10 hover:bg-white/20 text-gray-100 px-5 py-2 
              rounded-lg shadow-md font-medium transition-all duration-300"
            onClick={() => setShowOptions(!showOptions)}
          >
            Change Avatar
          </button>

          {showOptions && (
            <div className="absolute top-56 bg-white p-4 rounded-xl shadow-xl grid grid-cols-3 gap-4 z-20">
              {Object.entries(avatarOptions).map(([key, avatar]) => (
                <img
                  key={key}
                  src={avatar}
                  alt={key}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 
                    ${
                      selectedAvatar === key
                        ? "border-blue-500"
                        : "border-transparent"
                    } 
                    hover:border-blue-500 transition-all`}
                  onClick={() => setSelectedAvatar(key)}
                />
              ))}

              <button
                onClick={saveAvatar}
                className="col-span-3 mt-4 bg-blue-600 hover:bg-blue-700 
                  text-white px-4 py-2 rounded-lg shadow-md font-semibold"
              >
                Save Avatar
              </button>
            </div>
          )}
        </div>

        <h2 className="text-4xl font-extrabold text-center text-white">
          {coder?.name || "Loading..."}
        </h2>
        <p className="text-center text-lg text-gray-300">
          @{coder?.username || "loading"}
        </p>

        <div className="mt-10 space-y-6 text-lg">
          <div className="flex justify-between border-b border-gray-600 pb-3">
            <span className="text-gray-300 font-semibold">📧 Email:</span>
            <span className="text-white">{coder?.email || "Loading..."}</span>
          </div>
          <div className="flex justify-between border-b border-gray-600 pb-3">
            <span className="text-gray-300 font-semibold">
              💻 Codes Generated:
            </span>
            <span className="text-white">{numOfCodes}</span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/allcodes"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 
              rounded-xl shadow-lg font-semibold tracking-wide transition-all 
              duration-300 ease-in-out hover:scale-[1.02]"
          >
            View My Codes
          </a>
        </div>
      </div>
    </div>
  );
}
