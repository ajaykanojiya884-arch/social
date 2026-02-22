import React from 'react';
import '../styles/LikeButton.css';

export default function LikeButton({ liked, likesCount, onLike }) {
  return (
    <button
      className={`like-button ${liked ? 'liked' : ''}`}
      onClick={onLike}
      title={liked ? 'Unlike' : 'Like'}
    >
      <span className="heart-icon">{liked ? '❤️' : '🤍'}</span>
      <span className="likes-count">{likesCount}</span>
    </button>
  );
}
