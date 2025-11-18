import React from "react";

export default function Filters({
  filters,
  setFilters,
  industryOptions,
  locationOptions,
}) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>

      <style>
        {`
        .filter-container {
          background: #fff;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          margin-bottom: 18px;
        }

        .filter-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .filter-item label {
          font-size: 13px;
          font-weight: 600;
          color: #444;
        }

        .filter-input {
          height: 42px;
          padding: 8px 12px;
          border: 1px solid #cfcfcf;
          border-radius: 8px;
          font-size: 14px;
          background: #fff;
          transition: 0.2s ease;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .filter-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37,99,235,0.3);
          outline: none;
        }
      `}
      </style>

      {/* FILTER UI */}
      <div className="filter-container">

        {/* Search */}
        <div className="filter-item">
          <label>Search</label>
          <input
            type="text"
            name="q"
            value={filters.q}
            onChange={onChange}
            placeholder="Search company..."
            className="filter-input"
          />
        </div>

        {/* Industry */}
        <div className="filter-item">
          <label>Industry</label>
          <select
            name="industry"
            value={filters.industry}
            onChange={onChange}
            className="filter-input"
          >
            <option value="">All</option>
            {industryOptions.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="filter-item">
          <label>Location</label>
          <select
            name="location"
            value={filters.location}
            onChange={onChange}
            className="filter-input"
          >
            <option value="">All</option>
            {locationOptions.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="filter-item">
          <label>Sort</label>
          <select
            name="sort"
            value={filters.sort}
            onChange={onChange}
            className="filter-input"
          >
            <option value="name_asc">Name A → Z</option>
            <option value="name_desc">Name Z → A</option>
            <option value="employees_asc">Employees ↑</option>
            <option value="employees_desc">Employees ↓</option>
            <option value="founded_asc">Founded ↑</option>
            <option value="founded_desc">Founded ↓</option>
          </select>
        </div>

        {/* Per Page */}
        <div className="filter-item">
          <label>Per Page</label>
          <select
            name="perPage"
            value={filters.perPage}
            onChange={onChange}
            className="filter-input"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

      </div>
    </>
  );
}
