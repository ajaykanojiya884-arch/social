import React from 'react';
import Post from './Post';
import '../styles/Feed.css';

export default function Feed({
  posts,
  onLike,
  onAddComment,
  userLikedPosts,
}) {
  if (posts.length === 0) {
    return (
      <div className="feed-empty">
        <p>No posts yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="feed">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={onLike}
          onAddComment={onAddComment}
          userLiked={userLikedPosts.includes(post.id)}
        />
      ))}
    </div>
  );
}
