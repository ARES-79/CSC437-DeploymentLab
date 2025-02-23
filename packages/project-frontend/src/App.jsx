import { useState } from 'react'
import React from 'react';
import './App.css'
import { PostGallery } from './pages/PostGallery';
import { usePostFetching } from "./utils/usePostFetching.js";

function App() {
  const [count, setCount] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isLoading, fetchedPosts } = usePostFetching("");

  const handleDarkModeToggle = (event) => {
    const isChecked = event.target.checked;
    setIsDarkMode(isChecked);

    if (isChecked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <> 
      
      <label>
          <input id="dm-checkBox" type="checkbox" autoComplete="off"
           checked={isDarkMode}
           onChange={handleDarkModeToggle} />
          Dark mode
      </label>
      <PostGallery isLoading={isLoading} fetchedPosts={fetchedPosts}/>
      
    </>
  )
}

export default App
