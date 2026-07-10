import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from './EditPostForm.module.css'

export function EditPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id
  const { token } = useAuth()

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: content, 
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    async function getPostById(postId: string) {
      const res = await fetch(`https://blog-api-silk-nine.vercel.app/posts/${postId}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        
      });
      if(res.ok){
        const data = await res.json()
        setTitle(data.post.title)
        setContent(data.post.content)
        editor.commands.setContent(data.post.content)
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
    const res = await fetch(`https://blog-api-silk-nine.vercel.app/posts/edit`, {
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content: </label>
        <EditorContent
          id="content"
          value={content}
          className={styles.editor}
          editor={editor}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
