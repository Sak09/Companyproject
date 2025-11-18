import React, { useMemo, useState } from "react";
import { useCompanies } from "../context/CompanyContext";
import Filters from "./Filters";
import CompanyCard from "./CompanyCard";

function sortData(data, sortKey) {
  const copy = [...data];
  switch (sortKey) {
    case "name_asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "employees_asc":
      return copy.sort((a, b) => a.employees - b.employees);
    case "employees_desc":
      return copy.sort((a, b) => b.employees - a.employees);
    case "founded_asc":
      return copy.sort((a, b) => a.founded - b.founded);
    case "founded_desc":
      return copy.sort((a, b) => b.founded - a.founded);
    default:
      return copy;
  }
}

export default function CompanyList() {
  const { companies, loading, error } = useCompanies();

  const [filters, setFilters] = useState({
    q: "",
    industry: "",
    location: "",
    sort: "name_asc",
    perPage: 10,
  });
  const [page, setPage] = useState(1);

  const industryOptions = useMemo(
    () => Array.from(new Set(companies.map((c) => c.industry))).sort(),
    [companies]
  );

  const locationOptions = useMemo(
    () => Array.from(new Set(companies.map((c) => c.location))).sort(),
    [companies]
  );

  const processed = useMemo(() => {
    if (!companies) return [];
    let data = companies;

    const q = filters.q.trim().toLowerCase();
    if (q) data = data.filter((c) => c.name.toLowerCase().includes(q));
    if (filters.industry) data = data.filter((c) => c.industry === filters.industry);
    if (filters.location) data = data.filter((c) => c.location === filters.location);

    return sortData(data, filters.sort);
  }, [companies, filters]);

  const perPage = Number(filters.perPage || 10);
  const total = processed.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  if (page > totalPages) setPage(1);

  const start = (page - 1) * perPage;
  const pageItems = processed.slice(start, start + perPage);

  if (loading) return <div className="loader">Loading companies...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="company-wrapper">

      <Filters
        filters={filters}
        setFilters={(f) => {
          setFilters(f);
          setPage(1);
        }}
        industryOptions={industryOptions}
        locationOptions={locationOptions}
      />

      <div className="summary">
        Showing <strong>{pageItems.length}</strong> of <strong>{total}</strong> companies
      </div>

      <div className="table-container">
        <table className="company-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Industry</th>
              <th>Location</th>
              <th>Employees</th>
              <th>Founded</th>
            </tr>
          </thead>

          <tbody>
            {pageItems.map((c, index) => (
              <tr
                key={c.id}
                className={index % 2 === 0 ? "row-even" : "row-odd"}
              >
                <td className="name">{c.name}</td>
                <td>{c.industry}</td>
                <td>{c.location}</td>
                <td>{c.employees}</td>
                <td>{c.founded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="page-info">Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <style>{`
        .company-wrapper {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .summary {
          margin: 10px 0 15px;
          font-size: 15px;
          color: #444;
        }

        .table-container {
          width: 100%;
          overflow-x: auto;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }

        .company-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .company-table thead {
          background: #1e40af;
          color: white;
        }

        .company-table th {
          padding: 12px;
          text-align: left;
        }

        .company-table td {
          padding: 12px;
          border-bottom: 1px solid #ececec;
        }

        .row-even {
          background: #f7f9ff;
        }

        .row-odd {
          background: white;
        }

        .company-table tr:hover {
          background: #e8f0ff;
          transition: 0.2s;
        }

        .name {
          font-weight: bold;
          color: #1e3a8a;
        }

        .pagination {
          margin-top: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pagination button {
          padding: 7px 16px;
          border: 1px solid #1e40af;
          background: white;
          color: #1e40af;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .pagination button:hover:not(:disabled) {
          background: #1e40af;
          color: white;
        }

        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-info {
          font-size: 14px;
          color: #333;
        }

        .loader, .error {
          padding: 20px;
          text-align: center;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
