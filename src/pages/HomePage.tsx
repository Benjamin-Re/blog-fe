import { useEffect, useState } from "react";
import { Greeting } from "../components/Greeting";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"


export function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<
    { id: number; title: string; content: string }[]
  >([]);
  const { token } = useAuth()

  useEffect(() => {
    async function getPosts() {
      const raw = await fetch("http://localhost:3000/posts");
      const data = await raw.json();
      return data;
    }
    getPosts().then(setPosts);
  }, []);

  function handleEditClick(id: any) {
    navigate(`/posts/edit/${id}`);
  }

  function handleDeleteClick(id: any) {
    fetch(`http://localhost:3000/posts/delete` , {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id }),
    })
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
  }

  return (
    <>
      <Greeting></Greeting>
      <div>
        {posts.map((m) => (
          <div key={m.id}>
            <h3>{m.title}</h3>
            <p>{m.content}</p>
            <button onClick={() => handleEditClick(m.id)}>edit</button>
            <button onClick={() => handleDeleteClick(m.id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
