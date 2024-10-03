import { Space } from "antd";
import Page from "./Page";
import { useUser } from "../context/UserContext";
import { useFetch } from "../hooks/useRequests";
import PostCard, { Post } from "../modules/Post";
import SearchInput from "../modules/SearchInput/SearchInput";
import React from "react";

export default function Posts() {
  const { data: userDetails } = useUser();
  const [search, setSearch] = React.useState("");
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

  // TODO: debounce search value change for the filter
  const filteredPosts = posts?.filter((post) => post.title.includes(search));

  return (
    <Page title="Posts">
      <Space
        direction="vertical"
        style={{
          width: "500px",
        }}
      >
        <SearchInput value={search} onChange={setSearch} />

        {filteredPosts?.length && filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))
        ) : (
          <div style={{ textAlign: "center" }}>No posts found.</div>
        )}
      </Space>
    </Page>
  );
}
