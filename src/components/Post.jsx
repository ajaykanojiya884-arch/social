import React from 'react';
import LikeButton from './LikeButton';
import CommentBox from './CommentBox';
import { formatDate } from '../utils/storage';
import '../styles/Post.css';

export default function Post({
  post,
  onLike,
  onAddComment,
  userLiked,
}) {
  return (
    <article className="post">
      <div className="post-header">
        <div className="post-author-info">
          <div className="post-avatar">
            {post.author.charAt(0).toUpperCase()}
          </div>
          <div className="post-meta">
            <h3 className="post-author">{post.author}</h3>
            <time className="post-timestamp">
              {formatDate(post.timestamp)}
            </time>
          </div>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {post.image && (
        <div className="post-image-container">
          <img
            src={post.image}
            alt="Post"
            className="post-image"
          />
        </div>
      )}

      <div className="post-actions">
        <LikeButton
          liked={userLiked}
          likesCount={post.likes}
          onLike={() => onLike(post.id)}
        />
      </div>

      <CommentBox
        comments={post.comments || []}
        onAddComment={onAddComment}
        postId={post.id}
      />
    </article>
  );
}
