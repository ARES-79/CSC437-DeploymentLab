import React from 'react';
import { useState } from 'react'
import './App.css'
import { PostGallery } from './pages/PostGallery';
import { usePostFetching } from "./utils/usePostFetching.js";
import { Routes, Route } from "react-router";
import { MainLayout } from "./pages/MainLayout.jsx";

function App() {
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

  const POSSIBLE_ROUTES =
    <Routes>
      <Route path="/" element={<MainLayout/>} >
        <Route path="/*" element={
          <PostGallery isLoading={isLoading} fetchedPosts={fetchedPosts} 
          isDarkMode={isDarkMode} handleDarkModeToggle={handleDarkModeToggle}/>} />
        </Route>
    </Routes>

    return POSSIBLE_ROUTES;
}

export default App
