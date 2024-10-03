import { useEffect, useState } from "react";

import { Card, Space } from "antd";
import "./PostsPage.css";
import Page from "./Page";
import { useUser } from "../context/UserContext";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: userDetails } = useUser();
  const { id: userId } = userDetails || {};
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, [userId]);

  return (
    <Page title="Posts">
      <Space direction="vertical">
        {posts.length === 0
          ? "No posts found."
          : posts.map((post, index) => <PostCard key={index} post={post} />)}
      </Space>
    </Page>
  );
}

interface PostCardProps {
  post: Post;
}

function PostCard(props: PostCardProps) {
  const { post } = props;

  return (
    <Card className="post-card">
      <h3>{post.title}</h3>
    </Card>
  );
}
