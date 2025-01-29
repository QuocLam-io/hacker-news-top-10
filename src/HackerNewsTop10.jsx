// import React, { useState, useEffect } from "react";
// import "./HackerNewsTop10.scss";

// const HackerNewsTop10 = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   console.log(data, "data");

//   /* --------------------------- Fetch Article Data --------------------------- */
//   useEffect(() => {
//     const fetchAPIIds = async () => {
//       const url =
//         "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         const jsonedData = await response.json();
//         // console.log(jsonedData, "jsonedData");

//         for (let i = 0; i < 10; i++) {
//           let id = jsonedData[i];
//           const article = await fetch(
//             `https://hacker-news.firebaseio.com/v0/item/${id}.json`
//           );
//           const jsonedArticle = await article.json();
//           setData((prevData) => [...prevData, jsonedArticle]);
//         }
//       } catch (err) {
//         console.log(err, "err");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAPIIds();
//   }, []);

//   if (loading) {
//     return <h1>I am loading, GIVE ME A BREAK!</h1>;
//   }

//   return (
//     <div className="HackerNewsTop10">
//       <div className="card">
//         {data.map((datum) => {
//           return (
//             <>
//               <h1>{datum.title}</h1>
//               <h2>{datum.by}</h2>
//               <h3>{datum.score}</h3>
//               <p>{datum.url}</p>
//             </>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default HackerNewsTop10;

/* ----------------------------- Better Solution ---------------------------- */

import React, { useState, useEffect } from "react";
import "./HackerNewsTop10.scss";

const HackerNewsTop10 = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  /* --------------------------- Fetch Article Data --------------------------- */
  useEffect(() => {
    const fetchAPIIds = async () => {
      const url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonedData = await response.json();

        // Fetch the top 10 articles in parallel
        const top10Ids = jsonedData.slice(0, 10);
        const articlePromises = top10Ids.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );

        const articles = await Promise.all(articlePromises);
        setData(articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPIIds();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="HackerNewsTop10">
      <div className="card">
        {data.map((datum) => (
          <div key={datum.id}>
            <h1>{datum.title}</h1>
            <h2>By: {datum.by}</h2>
            <h3>Score: {datum.score}</h3>
            <p>
              <a href={datum.url} target="_blank" rel="noopener noreferrer">
                {datum.url}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HackerNewsTop10;