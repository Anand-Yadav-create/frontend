

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from './utils/constant';
import Navbar from './Navbar';
import Spinnerbutton from './spinner/Spinnerbutton';

const ExternalJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    keyword: '',
    type: '',
    location: ''
  });

  const [searchTriggered, setSearchTriggered] = useState(false);

  // Fetch jobs
  const fetchJobs = async (isNewSearch = false) => {
    setLoading(true);
    try {
      const { keyword, type, location } = filters;
      const query = `${keyword || 'software engineer'} ${type} ${location}`.trim();

      const response = await axios.get(`${JOB_API_END_POINT}/external?q=${query}&page=${isNewSearch ? 1 : page}`, {
        withCredentials: true,
      });

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setJobs(prev => isNewSearch ? response.data : [...prev, ...response.data]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchTriggered) {
      fetchJobs(true);
      setPage(1);
      setHasMore(true);
      setSearchTriggered(false);
    }
  }, [searchTriggered]);

  useEffect(() => {
    if (page !== 1) {
      fetchJobs();
    }
  }, [page]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && !loading && hasMore) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleInputChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSearch = () => {
    setJobs([]);
    setSearchTriggered(true);
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", margin: "0 auto", width: "60%", padding: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Search External Jobs
        </h2>

        {/* Search Filters */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            name="keyword"
            placeholder="Keyword (e.g., DevOps)"
            value={filters.keyword}
            onChange={handleInputChange}
            style={{ padding: '10px', width: '30%', marginRight: '10px' }}
          />
          <input
            type="text"
            name="type"
            placeholder="Job Type (e.g., Intern, Full-time)"
            value={filters.type}
            onChange={handleInputChange}
            style={{ padding: '10px', width: '20%', marginRight: '10px' }}
          />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Remote, Delhi)"
            value={filters.location}
            onChange={handleInputChange}
            style={{ padding: '10px', width: '20%', marginRight: '10px' }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '10px 16px',
              backgroundColor: '#0a9ecf9a',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </div>

    
          {jobs.map((job, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '16px',
              marginBottom: '12px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              {job.job_title}
            </h3>
            <p style={{ fontSize: '14px', marginBottom: '4px' }}>{job.company_name}</p>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>
              {job.job_city}, {job.job_country}
            </p>
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '8px',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              <button>Apply on Platform</button>
            </a>
          </div>
        ))}

        {/* Loading Spinner */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>
            <Spinnerbutton />
          </div>
        )}

        {!hasMore && !loading && (
          <p style={{ marginTop: '20px', fontWeight: 'bold' }}>No more jobs to load.</p>
        )}
      </div>
    </>
  );
};

export default ExternalJobs;
