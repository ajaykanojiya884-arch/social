import { useState, useEffect } from 'react';
import './App.css';
import AddPost from './components/AddPost';
import Feed from './components/Feed';
import { getPosts, savePosts } from './utils/storage';
import { MOCK_POSTS } from './utils/mockData';

function App() {
  const [posts, setPosts] = useState([]);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  // Load posts and liked posts from localStorage on mount
  useEffect(() => {
    let storedPosts = getPosts();
    
    // If no posts in localStorage, use mock data
    if (storedPosts.length === 0) {
      storedPosts = MOCK_POSTS;
      savePosts(storedPosts);
    }
    
    const storedLikes = localStorage.getItem('userLikedPosts');
    setPosts(storedPosts);
    if (storedLikes) {
      setUserLikedPosts(JSON.parse(storedLikes));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  // Save liked posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userLikedPosts', JSON.stringify(userLikedPosts));
  }, [userLikedPosts]);

  // Handle adding a new post
  const handleAddPost = (newPost) => {
    // Use functional update to avoid stale closures and ensure correct ordering
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Handle like/unlike functionality
  const handleLike = (postId) => {
    if (userLikedPosts.includes(postId)) {
      // Unlike
      setUserLikedPosts(userLikedPosts.filter((id) => id !== postId));
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, likes: Math.max(0, post.likes - 1) } : post
        )
      );
    } else {
      // Like
      setUserLikedPosts([...userLikedPosts, postId]);
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    }
  };

  // Handle adding a comment to a post
  const handleAddComment = (postId, comment) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), comment],
            }
          : post
      )
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📱 Social Feed</h1>
          <p>Share your thoughts with the world</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="sidebar">
            <AddPost onAddPost={handleAddPost} />
          </div>

          <div className="timeline">
            <Feed
              posts={posts}
              onLike={handleLike}
              onAddComment={handleAddComment}
              userLikedPosts={userLikedPosts}
            />
          </div>

          <div className="sidebar right-sidebar">
            <div className="info-card">
              <h3>👥 Activity</h3>
              <div className="activity-stats">
                <div className="stat">
                  <p className="stat-number">{posts.length}</p>
                  <p className="stat-label">Posts</p>
                </div>
                <div className="stat">
                  <p className="stat-number">
                    {posts.reduce((sum, post) => sum + post.likes, 0)}
                  </p>
                  <p className="stat-label">Likes</p>
                </div>
                <div className="stat">
                  <p className="stat-number">
                    {posts.reduce((sum, post) => sum + (post.comments?.length || 0), 0)}
                  </p>
                  <p className="stat-label">Comments</p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>ℹ️ About</h3>
              <p className="about-text">
                Interactive Social Feed Application built with React + Vite. Share posts,
                like content, and comment on posts from other users.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Social Feed. All rights reserved. | Built with React + Vite</p>
      </footer>
    </div>
  );
}

export default App;
