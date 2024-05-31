import React from 'react';

const Home = () => {
  // Random background image URL
  const backgroundImageUrl = 'https://source.unsplash.com/random';

  return (
    <div
      style={{
        backgroundColor:'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ color: 'white' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>The Home Component</h1>
      </div>
    </div>
  );
};

export default Home;
