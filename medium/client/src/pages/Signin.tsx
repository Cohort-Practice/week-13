import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import type { AuthResponse } from "../types";

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post<AuthResponse>(
        "http://localhost:3000/api/v1/user/signin",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Signin</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Login</button>

      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}
