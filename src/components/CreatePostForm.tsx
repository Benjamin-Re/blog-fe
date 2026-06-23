import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function CreatePostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate()
    const { token } = useAuth()

    const handleSubmit = async (e: any) => {
      e.preventDefault(); // prevent page reload
      const res = await fetch(`http://localhost:3000/posts/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title, content }),
      })
      if(res.ok) {
        navigate('/')
      }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="content">Content: </label>
                <input type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
