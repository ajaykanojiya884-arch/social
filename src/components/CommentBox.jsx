import React, { useState } from 'react';
import '../styles/CommentBox.css';

export default function CommentBox({ comments, onAddComment, postId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim() && authorName.trim()) {
      onAddComment(postId, {
        id: Date.now(),
        author: authorName,
        text: commentText,
        timestamp: new Date().getTime(),
      });
      setCommentText('');
      setAuthorName('');
    }
  };

  return (
    <div className="comment-box">
      <button
        className="toggle-comments-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬 Comments ({comments.length})
      </button>

      {isOpen && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <strong>{comment.author}</strong>
                    <span className="comment-time">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddComment} className="add-comment-form">
            <input
              type="text"
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              maxLength="50"
            />
            <textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              maxLength="200"
              rows="2"
            />
            <button type="submit">Post Comment</button>
          </form>
        </div>
      )}
    </div>
  );
}
