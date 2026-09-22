import { request } from "./client";

export type Post = {
  id: number;
  title: string;
  content: string;
  timestamp: string;
};

export const listPosts = () => request<Post[]>("/posts", { method: "GET" });

export const createPost = (
  input: { title: string; content: string },
  token: string,
) =>
  request<void>("/posts/create", {
    method: "POST",
    body: input,
    token,
  });

export const getPostById = (token: string, postId: string) => {
  return request<Post>(`/posts/${postId}`, { method: "GET", token });
};

export const updatePost = (
  input: { id: string; title: string; content: string },
  token: string,
) => request<void>("/posts/edit", { method: "POST", body: input, token });
