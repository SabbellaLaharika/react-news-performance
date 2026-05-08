import React from 'react';
import SlowNewsList from './components/SlowNewsList';
import heroImage from './assets/hero.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>High-Performance News Aggregator (Slow Version)</h1>
      </header>
      <main>
        {/* Anti-pattern: Large unoptimized image without width/height/srcset */}
        <div className="hero-container">
          <img 
            src={heroImage} 
            alt="Hero" 
            data-testid="hero-image"
            className="hero-image"
          />
        </div>
        
        <SlowNewsList />
      </main>
    </div>
  );
}

export default App;
