import React, { useState, useEffect } from "react";
import { getLinkAnalytics } from "./api";

function Analytics({ match }) {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data } = await getLinkAnalytics(match.params.id);
      setAnalytics(data);
    };
    fetchAnalytics();
  }, [match.params.id]);

  return (
    <div className="container">
      {analytics ? (
        <div>
          <h1 className="text-center my-5">{analytics.originalLink}</h1>
          <p>Short URL: {analytics.shortLink}</p>
          <p>Created at: {new Date(analytics.createdAt).toLocaleString()}</p>
          <p>Clicks: {analytics.clicks}</p>
          <h2>Clicks by day:</h2>
          <ul>
            {analytics.clicksByDay.map(({ date, count }) => (
              <li key={date}>
                {new Date(date).toLocaleDateString()}: {count}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Analytics;
