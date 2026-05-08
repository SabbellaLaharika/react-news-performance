import React, { useState, useEffect, useMemo, useRef } from 'react';
import sortBy from 'lodash/sortBy'; // Optimization: Cherry-picked import
import { useVirtualizer } from '@tanstack/react-virtual';
import OptimizedArticleItem from './OptimizedArticleItem';

const OptimizedNewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('none');
  
  const parentRef = useRef();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const ids = await response.json();
        
        // Optimization: Parallelize network requests with Promise.all
        // Fetching top 500
        const topIds = ids.slice(0, 500);
        const storyPromises = topIds.map(id => 
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );
        
        const stories = await Promise.all(storyPromises);
        setArticles(stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Optimization: useMemo for expensive filtering and sorting
  const processedArticles = useMemo(() => {
    let result = articles.filter(article => 
      article && article.title && article.title.toLowerCase().includes(filter.toLowerCase())
    );

    if (sortField === 'score') {
      result = sortBy(result, 'score').reverse();
    }
    
    return result;
  }, [articles, filter, sortField]);

  // Optimization: List Virtualization
  const rowVirtualizer = useVirtualizer({
    count: processedArticles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimated height of an article item
    overscan: 5,
  });

  return (
    <div className="news-container">
      <div className="controls">
        <input 
          type="text" 
          placeholder="Filter articles..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setSortField('score')}>Sort by Score</button>
        <button onClick={() => setSortField('none')}>Reset Sort</button>
      </div>

      {loading ? (
        <p>Loading articles in parallel...</p>
      ) : (
        <div 
          ref={parentRef} 
          data-testid="article-list" 
          className="article-list-container"
          style={{
            height: '600px',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <OptimizedArticleItem 
                key={processedArticles[virtualItem.index].id} 
                article={processedArticles[virtualItem.index]}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedNewsList;
