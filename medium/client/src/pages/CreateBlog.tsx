import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CreateBlog() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");
    } catch {
      alert("Error creating post");
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit}>Publish</button>
    </div>
  );
}
