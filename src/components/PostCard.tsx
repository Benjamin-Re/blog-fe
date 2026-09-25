import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./PostCard.module.css"
import { deletePost } from "../api/posts"

export function PostCard(props: any) {
  const navigate = useNavigate();
  const { token } = useAuth();

  function handleEditClick(id: any) {
    if(!token) throw new Error("Not logged in")
    navigate(`/posts/edit/${id}`);
  }

  function handleDeleteClick(id: any) {
    if(!token) throw new Error()
    deletePost(id, token)
    props.removeDeletedPost(id)
  }

  return (
    <div className={styles.postCardContainer}>
      <h3>{props.title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}
      />
      <div className={styles.postCardButtonContainer}>
        <button onClick={() => handleEditClick(props.id)}>edit</button>
        <button onClick={() => handleDeleteClick(props.id)}>delete</button>
      </div>
    </div>
  );
}
