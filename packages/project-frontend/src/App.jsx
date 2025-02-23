import { useState } from 'react'
import React from 'react';
import './App.css'
import BurritoPostCard from './components/BurritoPostCard';
import sampleBurrito1 from './assets/burritoImages/burrito1.jpeg';
import sampleBurrito2 from './assets/burritoImages/burrito2.jpeg';
import sampleBurrito3 from './assets/burritoImages/burrito3.jpeg';

function App() {
  const [count, setCount] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className="container">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
      <label>
          <input id="dm-checkBox" type="checkbox" autoComplete="off"
           checked={isDarkMode}
           onChange={handleDarkModeToggle} />
          Dark mode
      </label>
      <ul className="cards">
        <BurritoPostCard 
          username="username_1"
          image="image.jpeg" //{sampleBurrito1}
          title="Delicious Steak Burrito"
          description="A tasty steak burrito with fresh ingredients and homemade salsa."
          rating={4}
          price={8.99}
          location="San Diego, CA"
        />
        <BurritoPostCard 
          username="username_2"
          image="image.jpeg" // {sampleBurrito2}
          title="Delicious Steak Burrito"
          description="A tasty steak burrito with fresh ingredients and homemade salsa."
          rating={4}
          price={8.99}
          location="San Luis Obispo, CA"
        />
        <BurritoPostCard 
          username="username_2"
          image="image.jpeg" // {sampleBurrito3}
          title="Delicious Steak Burrito"
          description="A tasty steak burrito with fresh ingredients and homemade salsa."
          rating={4}
          location="Homemade"
        />
        
      </ul>
      
    </div>
  )
}

export default App
