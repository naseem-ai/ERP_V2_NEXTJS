'use client';

import React, { useState } from 'react';

export default function SearchForm() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement actual search logic here
  };

  return (
    <div className="navbar-form">
      <form onSubmit={handleSubmit} name="search_form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-search">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
}