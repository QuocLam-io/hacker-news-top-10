import { useState, useEffect } from "react";
import "./HackerNewsTop10.scss";

const HackerNewsTop10 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = `https://hacker-news.firebaseio.com/v0/topstories.json`;
  console.log(data, "data");

  /* --------------------------- Fetch data handler --------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        // console.log("blub")
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const parsedData = await response.json();
        const slicedData = parsedData.slice(0, 10);

        const fetchedItemsArr = await Promise.all(slicedData.map(fetchItem));

        setData(fetchedItemsArr);
      } catch (err) {
        console.log(`Warning Error Error${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ------------------------- Fetch item data handler ------------------------ */

  const fetchItem = async (id) => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.log(`Warning Error Error${err}`);
    }
  };

  /* -------------------------------------------------------------------------- */

  if (loading) {
    return <p>I am loading</p>;
  }

  return (
    <div className="container">
      {data.map((datum) => {
        return (
          <div key={datum.title}>
            <h1>Title: {datum.title}</h1>
            <h2>By: {datum.by}</h2>
            <h3>Score: {datum.score}</h3>
            <h4>Url: {datum.url}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default HackerNewsTop10;
