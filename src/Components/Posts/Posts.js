import React, { useState, useEffect } from "react";
import "./Posts.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase/firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase";

export const Post = ({ postId, user, caption, imageUrl, username }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
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
      <div className="post-comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post-comments-box">
          <input
            className="post-input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="post-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}
    </div>
  );
};
