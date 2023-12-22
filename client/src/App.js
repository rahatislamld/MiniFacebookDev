// App.js
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5040/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Initial fetch
  }, []); // Empty dependency array for initial fetch

  const handlePostCreated = async () => {
    await fetchPosts(); // Trigger re-fetch when a new post is created
  };

  const handleLogin = () => {
    // Implement your login logic here
    // For now, let's just set a mock authentication
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For now, let's just set a mock authentication
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {/* Main content when logged in */}
          <CreatePost onPostCreated={handlePostCreated} />
          <PostList posts={posts} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {/* Login page when not logged in */}
          <Login onLogin={handleLogin} />
          <Signup />
        </div>
      )}
    </div>
  );
  
};

export default App;
