import { Greeting } from "../components/Greeting";
import { PostCard } from "../components/PostCard";
import {usePosts} from '../hooks/usePosts'

export function HomePage() {
  const { posts, removeDeletedPost } = usePosts() // This calls usePosts (the function) on every render of HomePage

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
