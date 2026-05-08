import React, { Suspense, lazy } from 'react';
import heroImage from './assets/hero.png';
import './App.css';

// Optimization: Code Splitting using React.lazy
const OptimizedNewsList = lazy(() => import('./components/OptimizedNewsList'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>High-Performance News Aggregator (Optimized Version)</h1>
      </header>
      <main>
        {/* Optimization: Hero image with width, height, and srcset */}
        <div className="hero-container optimized">
          <img 
            src={heroImage} 
            srcSet={`${heroImage} 1200w, ${heroImage} 800w, ${heroImage} 400w`}
            sizes="(max-width: 1200px) 100vw, 1200px"
            width="1200"
            height="400"
            alt="Hero" 
            data-testid="hero-image"
            className="hero-image"
            loading="eager" // Hero image should load eagerly for LCP
          />
        </div>
        
        <Suspense fallback={<p>Loading optimized components...</p>}>
          <OptimizedNewsList />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
