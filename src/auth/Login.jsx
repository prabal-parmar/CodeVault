import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CoderContext } from "../context/CoderProvider";
import { login } from "../pages/AgentResponse/agentResponse";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { coder, setCoder } = useContext(CoderContext);

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(username, password);

      localStorage.setItem("token", res.data.token);

      setCoder(res.data.coder);

      console.log("Logged In ", res.data.coder.username);

      setUsername("");
      setPassword("");
      navigate("/", { replace: true });
    } catch (error) {
      console.log("Error in logging in");
    } finally {
      setLoading(false);
    }
  };

  if (coder) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 transition-colors duration-500">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 transition-colors duration-500">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handelSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                   text-white font-semibold transition duration-200 disabled:bg-indigo-300 dark:disabled:bg-indigo-400 transition-colors duration-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 transition-colors duration-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors duration-500"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
