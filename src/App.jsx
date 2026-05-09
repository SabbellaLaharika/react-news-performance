import React, { Suspense, lazy } from 'react';
import heroImage from './assets/hero.png';
import './App.css';

// Optimization: Code Splitting using React.lazy
const OptimizedNewsList = lazy(() => import('./components/OptimizedNewsList'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>HackerNews Aggregator</h1>
        <p className="subtitle">Top 500 stories · Optimized for performance</p>
      </header>
      <main>
        {/* Optimization: Hero image with width, height, and srcset */}
        <div className="hero-container optimized">
          <img 
            src={heroImage} 
            srcSet={`${heroImage} 1200w, ${heroImage} 800w, ${heroImage} 400w`}
            sizes="(max-width: 1200px) 100vw, 1200px"
            width="1200"
            height="514"
            alt="Tech cityscape hero" 
            data-testid="hero-image"
            className="hero-image"
            loading="eager"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <Suspense fallback={
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading components...</p>
          </div>
        }>
          <OptimizedNewsList />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
