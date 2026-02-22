import React, { useState } from 'react';
import { generateId } from '../utils/storage';
import '../styles/AddPost.css';

export default function AddPost({ onAddPost }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Handle image file selection and conversion to Base64
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, image: 'Please select an image file' }));
        setImage(null);
        setImagePreview(null);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: 'Image size must be less than 5MB',
        }));
        setImage(null);
        setImagePreview(null);
        return;
      }

      // Convert file to Base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setImage(base64String);
        setImagePreview(base64String);
        setErrors((prev) => ({ ...prev, image: null }));
      };
      reader.onerror = () => {
        setErrors((prev) => ({
          ...prev,
          image: 'Failed to read file',
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!author.trim()) {
      newErrors.author = 'Author name is required';
    }
    if (!content.trim()) {
      newErrors.content = 'Post content is required';
    }
    if (author.length > 50) {
      newErrors.author = 'Author name must be less than 50 characters';
    }
    if (content.length > 500) {
      newErrors.content = 'Post must be less than 500 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newPost = {
        id: generateId(),
        author: author.trim(),
        content: content.trim(),
        image: image || null, // Include image as Base64 string or null
        timestamp: new Date().getTime(),
        likes: 0,
        likedBy: [],
        comments: [],
      };

      onAddPost(newPost);
      setAuthor('');
      setContent('');
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="add-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="add-post-form">
        <div className="form-group">
          <label htmlFor="author">Your Name</label>
          <input
            id="author"
            type="text"
            placeholder="Enter your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength="50"
          />
          {errors.author && <span className="error">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">What's on your mind?</label>
          <textarea
            id="content"
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength="500"
            rows="4"
          />
          <div className="char-count">
            {content.length}/500
          </div>
          {errors.content && <span className="error">{errors.content}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Add a Photo (Optional)</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="image-input"
          />
          <p className="file-hint">Supported formats: JPG, PNG, GIF, WebP (Max 5MB)</p>
          {errors.image && <span className="error">{errors.image}</span>}
        </div>

        {imagePreview && (
          <div className="image-preview-container">
            <div className="image-preview-header">
              <h4>Preview</h4>
              <button
                type="button"
                className="remove-image-btn"
                onClick={handleRemoveImage}
                title="Remove image"
              >
                ✕
              </button>
            </div>
            <img
              src={imagePreview}
              alt="Preview"
              className="image-preview"
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Post
        </button>
      </form>
    </div>
  );
}
