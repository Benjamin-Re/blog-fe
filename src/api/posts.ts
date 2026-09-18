import { request } from "./client";

export type Post = {
  id: number;
  title: string;
  content: string;
  timestamp: string;
};

export const listPosts = () => request<Post[]>("/posts", { method: "GET" });

