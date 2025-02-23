import React from 'react';
import { useState } from 'react'
import './App.css'
import { PostGallery } from './pages/PostGallery';
import Profile from './pages/Profile.jsx';
import { usePostFetching } from "./utils/usePostFetching.js";
import { Routes, Route } from "react-router";
import { MainLayout } from "./pages/MainLayout.jsx";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isLoading, fetchedPosts } = usePostFetching("", "");
  const [user, setUser] = useState({
    userId: '1',
    username: 'burritoMaster123',
    profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg',
    location: 'San Diego, CA',
  });

  const handleDarkModeToggle = (event) => {
    const isChecked = event.target.checked;
    setIsDarkMode(isChecked);

    if (isChecked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const updateUser = (updatedFields) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedFields,  // Merge only the updated fields
    }));
};

  const POSSIBLE_ROUTES =
    <Routes>
      <Route path="/" element={<MainLayout/>} >
        <Route path="/" element={
          <PostGallery header="Burrito Discovery Gallery" isLoading={isLoading} fetchedPosts={fetchedPosts} />} />
        <Route path="/profile" element={
          <Profile user={user} updateUser={updateUser} 
            isDarkMode={isDarkMode} handleDarkModeToggle={handleDarkModeToggle} />} />
      </Route>
    </Routes>

    return POSSIBLE_ROUTES;
}

export default App
