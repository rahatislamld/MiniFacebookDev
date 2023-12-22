// CreatePost.js
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleCreatePost = async () => {
    try {
      const formData = new FormData();
      formData.append('text', text);

      images.forEach((image) => formData.append('images', image));
      videos.forEach((video) => formData.append('videos', video));

      await axios.post('http://localhost:5040/api/posts', formData);

      // Trigger the callback to update the post list
      if (onPostCreated) {
        onPostCreated();

        // Clear form after successful post creation
        setText('');
        setImages([]);
        setVideos([]);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="w-full mx-auto mt-8 max-w-4xl">
      <h2 className="text-3xl font-bold mb-4">Create New Post</h2>
      <div className="bg-white p-6 rounded shadow mb-6">
        <label className="block mb-2 text-lg">Text:</label>
        <textarea
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label className="block mt-4 mb-2 text-lg">Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages([...images, ...e.target.files])}
        />
        {images.length > 0 && (
          <div className="flex space-x-2 mt-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
                className="h-16 w-16 object-cover rounded"
              />
            ))}
          </div>
        )}

        <label className="block mt-4 mb-2 text-lg">Videos:</label>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={(e) => setVideos([...videos, ...e.target.files])}
        />
        {videos.length > 0 && (
          <div className="flex space-x-2 mt-2">
            {videos.map((video, index) => (
              <video
                key={index}
                src={URL.createObjectURL(video)}
                controls
                className="h-16 w-16 object-cover rounded"
              />
            ))}
          </div>
        )}

        <button
          className="mt-4 bg-blue-500 max-w-sm hover:bg-blue-800 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={handleCreatePost}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
