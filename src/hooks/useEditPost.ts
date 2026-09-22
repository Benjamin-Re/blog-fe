// src/hooks/useUpdatePost.ts
import { useAuth } from "../context/AuthContext";
import { updatePost } from "../api/posts";

export function useEditPost() {
  const { token } = useAuth();
  return (input: { id: string; title: string; content: string }) => {
    if (!token) throw new Error("Not logged in");
    return updatePost(input, token);
  };
}
