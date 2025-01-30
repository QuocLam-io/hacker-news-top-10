import React, { useEffect, useState } from "react";

const HackerNewsTop10 = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  /* -------------------------------- fetchData ------------------------------- */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
        );

        if (!response.ok) {
          throw new Error(response.status);
        }

        const res = await response.json();
        const slicedArr = res.slice(0, 10);

        let arr = [];
        for (let i = 0; i < 10; i++) {
          const item = await fetchItem(slicedArr[i]);
          arr.push(item);
        }

        setData(arr);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ------------------------------- fetch Item ------------------------------- */

  const fetchItem = async (id) => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  /* --------------------------------- Loading -------------------------------- */
  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="container">
      {data.map((datum) => {
        return (
          <div key={datum.title}>
            <h1>{datum.title}</h1>
            <h1>{datum.by}</h1>
            <h1>{datum.score}</h1>
            <h1>{datum.url}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default HackerNewsTop10;
