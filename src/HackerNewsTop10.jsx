import React, { useState, useEffect } from "react";
import "./HackerNewsTop10.scss";

const HackerNewsTop10 = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data, "data");

  /* --------------------------- Fetch Article Data --------------------------- */
  useEffect(() => {
    const fetchAPIIds = async () => {
      const url =
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const jsonedData = await response.json();
        // console.log(jsonedData, "jsonedData");

        for (let i = 0; i < 10; i++) {
          let id = jsonedData[i];
          const article = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          const jsonedArticle = await article.json();
          setData((prevData) => [...prevData, jsonedArticle]);
        }
      } catch (err) {
        console.log(err, "err");
      } finally {
        setLoading(false);
      }
    };

    fetchAPIIds();
  }, []);

  if (loading) {
    return <h1>I am loading, GIVE ME A BREAK!</h1>;
  }

  return (
    <div className="HackerNewsTop10">
      <div className="card">
        {data.map((datum) => {
          return (
            <>
              <h1>{datum.title}</h1>
              <h2>{datum.by}</h2>
              <h3>{datum.score}</h3>
              <p>{datum.url}</p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default HackerNewsTop10;
