import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types";

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const res = await axios.get<Post[]>(
      "http://localhost:3000/api/v1/blog/bulk/all"
    );
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={() => navigate("/create")}>
        Create Blog
      </button>

      <button onClick={logout}>Logout</button>

      <hr />

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>By: {post.username}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}
