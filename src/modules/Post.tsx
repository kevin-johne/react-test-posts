import { Card } from "antd";
import React from "react";
import "./Post.css";
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostCardProps {
  post: Post;
}

/**
 * Better to use the Collapse component instead of using the Card component
 * https://ant.design/components/collapse/
 *
 * But did this to show a simple toggle with a max-height transition
 * the content is scrollable if it is more than 200px height
 */
export default function PostCard(props: PostCardProps) {
  const { post } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Card className={`post-card ${isExpanded ? "expanded" : ""}`}>
      <h3 onClick={handleExpand} style={{ cursor: "pointer" }}>
        {post.title}
      </h3>
      <div className={"post-card-body"}>
        <hr />
        <p>{post.body}</p>
      </div>
    </Card>
  );
}
