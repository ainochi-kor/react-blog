import { PostData } from "@/types/post.type";
import React from "react";

const PostProfile: React.FC<{ post: PostData }> = ({ post }) => {
  console.log(post.createdAt);
  return (
    <div className="post__profile-box">
      <div className="post__profile" />
      <div className="post__author-name">{post.email}</div>
      <div className="post__date">{post.createdAt.toDate().toString()}</div>
    </div>
  );
};

export default PostProfile;
