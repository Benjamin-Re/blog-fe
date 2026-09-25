import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./CreatePostForm.module.css";
import { createPost } from "../api/posts"
import { useAuth } from "../context/AuthContext";

export function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent page reload
    if (!token) throw new Error("Not logged in");
    createPost({ title, content }, token);
    navigate("/");
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
