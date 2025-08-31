import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { logoutCoder } from "../pages/AgentResponse/agentResponse";

export const CoderContext = createContext();

function CoderProvider({ children }) {
  const [coder, setCoder] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    logoutCoder(setCoder)
  };

  useEffect(() => {
    const fetchCoder = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setCoder(null);
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3000/auth/coder", {
          withCredentials: true,
        });
        if (res.data.coder) {
          setCoder(res.data.coder);
        }
      } catch (error) {
        console.log(error);
        setCoder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCoder();
  }, []);

  return (
    <CoderContext.Provider value={{ coder, setCoder, loading, logout }}>
      {children}
    </CoderContext.Provider>
  );
}

export default CoderProvider;
