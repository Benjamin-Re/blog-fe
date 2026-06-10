import { useState } from "react";
import { useNavigate } from "react-router-dom"

export function CreateMessageForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
      e.preventDefault(); // prevent page reload                                                                                                                                          
      const res = await fetch(`http://localhost:3000/messages/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ title, content }),
        credentials: 'include'
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
