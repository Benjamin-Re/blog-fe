import { useAuth } from "../context/AuthContext";
import { createPost } from "../api/posts";

export function useCreatePost() {
  const { token } = useAuth();

  return (input: { title: string; content: string }) => {
    if (!token) throw new Error("Not logged in");
    return createPost(input, token);
  };
}