import Quote from "../components/Quote";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import type { AuthResponse } from "../types";

const Signup = () => {

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post<AuthResponse>(
        "http://localhost:3000/api/v1/user/signup",
        { username, email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="h-screen flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold">Create an account</h2>
          <p className="text-gray-600 text-md">
            Already have an account? <Link to="/">Signin</Link>
          </p>
          <div className="flex flex-col gap-4 mt-6 w-1/2">
            <p className="font-semibold">Username</p>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <p className="font-semibold">Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="font-semibold">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-gray-900 text-white w-96 rounded-md h-10 cursor-pointer mt-5 hover:bg-gray-800 font-semibold"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
        <Quote />
      </div>
    </>
  );
};

export default Signup;
