import React from 'react';
import { useEffect, useState } from 'react'
import './App.css'
import Profile from './pages/Profile.tsx';
import { usePostFetching } from "./utils/usePostFetching.js";
import { Routes, Route } from "react-router";
import { MainLayout } from "./pages/MainLayout.jsx";
import { PostGallery } from './pages/PostGallery.js';
import { CreatePostPage } from './pages/CreatPostPage.js';
import { PostDetails } from './pages/PostDetails.js';
import { RegisterPage } from './pages/auth/RegisterPage.tsx';
import { LoginPage } from './pages/auth/LoginPage.jsx';
import { useUserInfoFetching } from './utils/useUserInfoFetching.ts';
import { ProtectedRoute } from './ProtectedRoute.tsx';


/* 
I am currently having an issue with converting files with components related to Routes
to TypeScript (after importing the react router types)
- <Routes>, <Route>, <Link>, and <Outlet> are all affected by this issue 

Oddly enough, I had no problem converting main.jsx to Typescript even though it has the related
<BrowserRouter> component. 

*/

function App() {

  const [authToken, setAuthToken] = useState("");
  const { isLoading, fetchedPosts } = usePostFetching("", "", authToken);
  const { isLoadinguser, fetchedUser, setFetchedUser } = useUserInfoFetching(authToken);

  useEffect(() => {
    if (fetchedUser.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [fetchedUser.darkMode]);

  const handleDarkModeToggle = (event) => {
    const isChecked = event.target.checked;
    updateUser({ darkMode: isChecked });
  };

  const updateUser = (updatedFields) => { //: UpdateUserData
    setFetchedUser((prevUser) => ({
      ...prevUser,
      ...updatedFields,  // Merge only the updated fields
    }));
  };


  const POSSIBLE_ROUTES =
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="/" element={
          <ProtectedRoute authToken={authToken} >
            <PostGallery header="Burrito Discovery Gallery" currentUserId={fetchedUser._id}
              isLoading={isLoading} fetchedPosts={fetchedPosts} expandedContent={false} />
          </ProtectedRoute>
        } />
        <Route path="/post" element={
          <ProtectedRoute authToken={authToken} >
            <CreatePostPage user={fetchedUser} authToken={authToken}/>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute authToken={authToken} >
            <Profile user={fetchedUser} updateUser={updateUser}
              isDarkMode={fetchedUser.darkMode} handleDarkModeToggle={handleDarkModeToggle}
              authToken={authToken} />
          </ProtectedRoute>
        } />
        <Route path="/profiles/:userId" element={
          <ProtectedRoute authToken={authToken} >
            <Profile user={fetchedUser} authToken={authToken} />
          </ProtectedRoute>
        } />
        <Route path="/posts/:postId" element={
          <ProtectedRoute authToken={authToken} >
            <PostDetails currentUserId={fetchedUser._id} authToken={authToken} />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<RegisterPage onValidRegister={setAuthToken} />} />
        <Route path="/login" element={<LoginPage onValidLogin={setAuthToken} />} />
      </Route>
    </Routes>

  return POSSIBLE_ROUTES;
}

export default App
