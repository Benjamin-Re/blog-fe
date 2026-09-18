import { useState, useEffect } from "react";
import { listPosts, type Post } from "../api/posts";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    listPosts().then(setPosts);
  }, []);

  function removeDeletedPost(id: Number) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  }

  return { posts, removeDeletedPost };
}
