import { useEffect, useState } from "react";
import { Greeting } from "../components/Greeting";
import { PostCard } from "../components/PostCard";
import { listPosts, type Post } from "../api/posts";

export function HomePage() {
  const [posts, setPosts] = useState<
    { id: number; title: string; content: string }[]
  >([]);

  useEffect(() => {
    listPosts().then(setPosts);
  }, []);

  function removeDeletedPost(id: Number) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  }

  return (
    <>
      <Greeting></Greeting>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <PostCard
              title={post.title}
              content={post.content}
              id={post.id}
              removeDeletedPost={removeDeletedPost}
            ></PostCard>
          </div>
        ))}
      </div>
    </>
  );
}
