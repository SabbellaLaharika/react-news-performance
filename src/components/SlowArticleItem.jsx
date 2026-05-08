import React from 'react';

const SlowArticleItem = ({ article }) => {
  // Anti-pattern: Expensive computation in render (un-memoized)
  const formatDate = (timestamp) => {
    // Intentionally inefficient date formatting
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  if (!article) return null;

  return (
    <div data-testid="article-item" className="article-item">
      <h3>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          {article.title}
        </a>
      </h3>
      <p>
        <span>{article.score} points</span> | 
        <span> by {article.by}</span> | 
        <span> {formatDate(article.time)}</span>
      </p>
    </div>
  );
};

export default SlowArticleItem;
