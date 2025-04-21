import React, { useState, useEffect } from 'react';

const Counter = ({ endValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 50); // Increment per 50ms
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  // Format number using Indian numbering system (e.g., 2,11,500)
  const formattedCount = new Intl.NumberFormat('en-IN').format(count);

  return <span>{formattedCount}</span>;
};

export default Counter;