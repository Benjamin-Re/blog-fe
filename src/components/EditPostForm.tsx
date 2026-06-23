import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export function EditPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id
  const { token } = useAuth()

  useEffect(() => {
    async function getPostById(postId: string) {
      const res = await fetch(`http://localhost:3000/posts/edit/${postId}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        
      });
      if(res.ok){
        const data = await res.json()
        setTitle(data.post.title)
        setContent(data.post.content)
      }
    }
    if(postId) {
      getPostById(postId)
    } else {
      console.log('no postId provided')
    }
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent page reload
    const id = postId
    const res = await fetch(`http://localhost:3000/posts/edit`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id, title, content }),
    });
    if (res.ok) {
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content: </label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
