import { useState, useEffect } from "react";
import { getPostById, type Post } from "../api/posts";
import { useAuth } from "../context/AuthContext";

export function useGetPost(postId: string) {
    const { token } = useAuth()
    const [post, setPost] = useState<Post>();

  useEffect(() => {
    if (!token) throw new Error("Not logged in");
    getPostById(postId, token).then((result) => {
        setPost(result.post)
    });
  }, [postId]);

  return { post }
}
