// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { JOB_API_END_POINT } from './utils/constant';
// import Navbar from './Navbar';
// import Spinnerbutton from './spinner/Spinnerbutton';

// const ExternalJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);


//   // const fetchJobs = async () => {

//   //   try {
//   //     const response = await axios.get(`${JOB_API_END_POINT}/external?q=software engineer`, {
//   //       withCredentials: true,
//   //     });
//   //     setJobs(response.data);
//   //   } catch (error) {
//   //     console.error('Error fetching external jobs:', error);
//   //   }
//   //   setLoading(false);
//   // };


  
//   const fetchJobs = async (pageNumber = 1) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${JOB_API_END_POINT}/external?q=software engineer&page=${pageNumber}`, {
//         withCredentials: true,
//       });
//       setJobs(prevJobs => [...prevJobs, ...response.data]);
//     } catch (error) {
//       console.error('Error fetching external jobs:', error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchJobs(page);
//   }, [page]);

//   // Infinite scroll logic
//   useEffect(() => {
//     const handleScroll = () => {
//       const bottomReached =
//         window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

//       if (bottomReached && !loading) {
//         setPage(prev => prev + 1);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [loading]);

//   // useEffect(() => {
//   //   fetchJobs();
//   // }, []);

//   //   if (loading) return <p>Loading external jobs...</p>;

//   return (
//     <>
//       <Navbar />
//       {loading ? (<div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',

//         }}
//       >
//         <Spinnerbutton />
//       </div>) : (
//         <div style={{ textAlign: "center", margin: "0 auto", width: "50%", justifyContent: "center", padding: '16px' }}>
//           <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
//             External Jobs (e.g., LinkedIn, Naukri)
//           </h2>
//           {jobs.map((job, index) => (
//             <div
//               key={index}
//               style={{
//                 border: '1px solid #ccc',
//                 padding: '16px',
//                 marginBottom: '12px',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
//                 {job.job_title}
//               </h3>
//               <p style={{ fontSize: '14px', marginBottom: '4px' }}>{job.company_name}</p>
//               <p style={{ fontSize: '14px', marginBottom: '8px' }}>
//                 {job.job_city}, {job.job_country}
//               </p>
              
//                 <a
//                   href={job.job_apply_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     display: 'inline-block',
//                     marginTop: '8px',
//                     // backgroundColor: '#2563EB', // blue-600
//                     color: '#fff',
//                     padding: '8px 16px',
//                     borderRadius: '6px',
//                     textDecoration: 'none',
//                   }}
//                 >
//                   <button> Apply on Platform</button>
//                 </a>
//               </div>
              
//   ))}

//                {loading && (
//           <div style={{ marginTop: '20px' }}>
//             <Spinnerbutton />
//           </div>
//         )}
//             </div>)}

//   </>);
// };

//       export default ExternalJobs;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from './utils/constant';
import Navbar from './Navbar';
import Spinnerbutton from './spinner/Spinnerbutton';

const ExternalJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false); // loading for fetch
  const [page, setPage] = useState(1); // current page
  const [hasMore, setHasMore] = useState(true); // track if more data exists

  // Fetch jobs when page changes
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/external?q=software engineer&page=${page}`, {
          withCredentials: true,
        });

        // If no more jobs returned, stop further requests
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setJobs(prevJobs => [...prevJobs, ...response.data]);
        }
      } catch (error) {
        console.error('Error fetching external jobs:', error);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [page]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

      if (nearBottom && !loading && hasMore) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", margin: "0 auto", width: "50%", padding: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          External Jobs (e.g., LinkedIn, Naukri)
        </h2>

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

        {loading && (
          <div style={{display:"flex",justifyContent:"center", marginTop: '20px' }}>
            <Spinnerbutton />
          </div>
        )}

        {!hasMore && (
          <p style={{ marginTop: '20px', fontWeight: 'bold' }}>No more jobs to load.</p>
        )}
      </div>
    </>
  );
};

export default ExternalJobs;

