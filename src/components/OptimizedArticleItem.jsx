import React, { memo } from 'react';

// Optimization: Single Intl.DateTimeFormat instance outside component
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

// Optimization: React.memo to prevent unnecessary re-renders
const OptimizedArticleItem = memo(({ article, style }) => {
  if (!article) return null;

  return (
    <div 
      data-testid="article-item" 
      className="article-item"
      style={style}
    >
      <h3>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          {article.title}
        </a>
      </h3>
      <p>
        <span className="score">{article.score} pts</span>
        <span className="separator">·</span>
        <span className="author">{article.by}</span>
        <span className="separator">·</span>
        <span>{dateFormatter.format(new Date(article.time * 1000))}</span>
      </p>
    </div>
  );
});

OptimizedArticleItem.displayName = 'OptimizedArticleItem';

export default OptimizedArticleItem;
