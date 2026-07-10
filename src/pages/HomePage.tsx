import { useEffect, useState } from "react";
import { Greeting } from "../components/Greeting";
import { PostCard } from "../components/PostCard";

export function HomePage() {
  const [posts, setPosts] = useState<
    { id: number; title: string; content: string }[]
  >([]);

  useEffect(() => {
    async function getPosts() {
      const raw = await fetch("https://blog-api-silk-nine.vercel.app/posts");
      const data = await raw.json();
      return data;
    }
    getPosts().then(setPosts);
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
