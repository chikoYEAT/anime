import React, { useState, useEffect } from 'react';

interface AnimeTitle {
  title: string;
  img: string;
}

function App() {

  const [title, setTitle] = useState<AnimeTitle | null>(null);
  const [img, setimg] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [score, setScore] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/random/anime')
      .then(response => response.json())
      .then(res => {
        if (res.data && Array.isArray(res.data.titles) && res.data.titles.length > 0) {
          setTitle(res.data.titles[0]);
          setimg(res.data.images.jpg.image_url)
          setType(res.data.type)
          setStatus(res.data.status)
          setScore(res.data.score)
        } else {
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
      <p>Name: {title && title.title ? title.title : 'Loading...'}</p>
      <p>type: {type ? type : 'Loading...'}</p>
      <p>{score ? `Score: ${score}` : ""}</p>
      <p>status: {status ? status : 'Loading...'}</p>
      <p style={{display: 'flex', alignItems: 'center',justifyContent: 'center'  }}>⭐ star this repo on <a href='https://github.com/imanav10/anime.git' style={{textDecoration: 'none'}} target="_blank">: Github</a></p>
    </div>
  );
}

export default App;