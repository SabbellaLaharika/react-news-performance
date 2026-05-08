import React, { useState, useEffect } from 'react';
import _ from 'lodash'; // Unoptimized full import
import SlowArticleItem from './SlowArticleItem';

const SlowNewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('none');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Anti-pattern: Sequential N+1 requests
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const ids = await response.json();
        
        const stories = [];
        // Sequential fetching of top 500 items
        for (const id of ids.slice(0, 500)) {
          const storyResp = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          const storyData = await storyResp.json();
          stories.push(storyData);
        }
        setArticles(stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Anti-pattern: Sorting inside render (expensive)
  const filteredArticles = articles.filter(article => 
    article && article.title && article.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedArticles = sortBy === 'score' 
    ? _.sortBy(filteredArticles, 'score').reverse() 
    : filteredArticles;

  return (
    <div className="news-container">
      <div className="controls">
        <input 
          type="text" 
          placeholder="Filter articles..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setSortBy('score')}>Sort by Score</button>
        <button onClick={() => setSortBy('none')}>Reset Sort</button>
      </div>

      {loading ? (
        <p>Loading 500 articles sequentially... (This will take a while)</p>
      ) : (
        <div data-testid="article-list" className="article-list">
          {sortedArticles.map((article) => (
            <SlowArticleItem key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SlowNewsList;
