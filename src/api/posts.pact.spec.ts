import { PactV3, MatchersV3 } from "@pact-foundation/pact";
import { listPosts, createPost } from "./posts";

const { eachLike, like } = MatchersV3;

const pact = new PactV3({
  consumer: "blog-fe",
  provider: "blog-api",
});

describe("GET /posts", () => {
  it("returns a list of posts", () => {
    pact
      .uponReceiving("a request for all posts")
      .withRequest({ method: "GET", path: "/posts" })
      .willRespondWith({
        status: 200,
        body: eachLike({
          id: like(1),
          title: like("My Post"),
          content: like("My Content"),
          timestamp: like("2026-01-01T00:00:00Z"),
        }),
      });
    return pact.executeTest(async (mockServer) => {
      vi.stubEnv("VITE_API_BASE_URL", mockServer.url);
      const posts = await listPosts();
      expect(posts).toHaveLength(1);
      expect(posts[0]).toMatchObject({
        id: 1,
        title: "My Post",
        content: "My Content",
        timestamp: "2026-01-01T00:00:00Z",
      });
    });
  });
});

describe("POST /posts/create", () => {
  it("returns ok on create post", () => {
    pact
      .uponReceiving("a post request to create a new post")
      .withRequest({
        method: "POST",
        path: "/posts/create",
        body: { title: "My Title", content: "My Content" },
      })
      .willRespondWith({
        status: 200,
        body: like({ title: "My Title", content: "My Content"})
      });
    const token = "test-token"
    return pact.executeTest(async (mockServer) => {
      vi.stubEnv("VITE_API_BASE_URL", mockServer.url);
      const res = await createPost(
        { title: "My Title", content: "My Content" },
        token,
      );
      expect(res).toBeTruthy()
    });
  });
});

export type Post = {
  id: number;
  title: string;
  content: string;
  timestamp: string;
};
