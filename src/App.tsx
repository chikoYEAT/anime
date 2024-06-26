import React, { useState, useEffect } from 'react';

// Define an interface for the title structure
interface AnimeTitle {
  title: string;
  img: string;
}

function App() {
  // Use the AnimeTitle interface to type the title state variable
  const [title, setTitle] = useState<AnimeTitle | null>(null);
  const [img, setimg] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/random/anime')
      .then(response => response.json())
      .then(res => {
        // Safely access the title property if it exists
        if (res.data && Array.isArray(res.data.titles) && res.data.titles.length > 0) {
          // Ensure the object assigned to title matches the AnimeTitle interface
          setTitle(res.data.titles[0]);
          setimg(res.data.images.jpg.image_url)
        } else {
          // Handle the case where the expected data structure is not present
          console.error("Unexpected data structure:", res);
          setError({ message: "Unexpected data structure" });
        }
      })
      .catch(err => setError(err));
  }, []);

  return (
    <div>
      <h3 style={{display: 'flex', alignItems: 'center',justifyContent: 'center'  }} className="App">
        <span>Random Anime</span>
        
      </h3>
      {img && (
        <img src={img} alt="Image description" />
      )}
      <p>{title && title.title ? title.title : 'Loading...'}</p>

    </div>
  );
}

export default App;