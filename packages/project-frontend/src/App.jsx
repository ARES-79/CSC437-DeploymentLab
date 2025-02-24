import React from 'react';
import { useEffect, useState } from 'react'
import './App.css'
import Profile from './pages/Profile.jsx';
import { usePostFetching } from "./utils/usePostFetching.js";
import { Routes, Route } from "react-router";
import { MainLayout } from "./pages/MainLayout.jsx";
import { PostGallery } from './pages/PostGallery';
import { CreatePostPage } from './pages/CreatPostPage.jsx';

function App() {
  const { isLoading, fetchedPosts } = usePostFetching("", "");
  const [user, setUser] = useState({
    userId: '1',
    username: 'burritoMaster123',
    profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg',
    location: 'San Diego, CA',
    darkMode: true,
  });

  useEffect(() => {
    if (user.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [user.darkMode]);

  const handleDarkModeToggle = (event) => {
    const isChecked = event.target.checked;
    updateUser({ darkMode: isChecked });
  };

  const updateUser = (updatedFields) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedFields,  // Merge only the updated fields
    }));
  };

  const POSSIBLE_ROUTES =
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="/" element={
          <PostGallery header="Burrito Discovery Gallery" currentUserId={user.userId}
            isLoading={isLoading} fetchedPosts={fetchedPosts} />} />
        <Route path="/post" element={
          <CreatePostPage/>} />
        <Route path="/profile" element={
          <Profile user={user} updateUser={updateUser}
            isDarkMode={user.darkMode} handleDarkModeToggle={handleDarkModeToggle} />} />
        <Route path="/profiles/:userId" element={
          <Profile user={user} />} />

      </Route>
    </Routes>

  return POSSIBLE_ROUTES;
}

export default App
