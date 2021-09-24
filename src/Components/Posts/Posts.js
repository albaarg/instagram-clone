import React from "react";
import "./Posts.css";
import Avatar from "@material-ui/core/Avatar";

export const Post = ({ caption, imageUrl, username }) => {
  return (
    <div className="posts">
      <div className="post-header">
        <Avatar
          className="post-avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className="posts-images" src={imageUrl} alt=""></img>
      <h4 className="posts-text">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
};
