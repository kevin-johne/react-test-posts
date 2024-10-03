import { Space } from "antd";
import Page from "./Page";
import { useUser } from "../context/UserContext";
import { useFetch } from "../hooks/useRequests";
import PostCard, { Post } from "../modules/Post";

export default function Posts() {
  const { data: userDetails } = useUser();
  const { id: userId } = userDetails || {};
  const {
    data: posts,
    isError,
    isLoading,
  } = useFetch<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <Page title="Posts">
      <Space direction="vertical">
        {posts?.length && posts.length > 0
          ? posts.map((post, index) => <PostCard key={index} post={post} />)
          : "No posts found."}
      </Space>
    </Page>
  );
}
