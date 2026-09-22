import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPost } from "../hooks/useGetPostById";
import { useEditPost } from "../hooks/useEditPost";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./EditPostForm.module.css";

export function EditPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  if (!postId) throw new Error("No PostID provided");
  const { post } = useGetPost(postId);
  const submitEdit = useEditPost()

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!post || !editor) return;
    setTitle(post.title);
    setContent(post.content);
    editor.commands.setContent(post.content);
  }, [post, editor]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await submitEdit({ id: postId, title, content });
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
