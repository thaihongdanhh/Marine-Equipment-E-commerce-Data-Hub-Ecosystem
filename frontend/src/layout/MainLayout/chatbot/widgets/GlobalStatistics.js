import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { getData } from "../data";

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const stats = await getData();

      // const filteredFlights = flights.filter((item) => item.Status === null);

      setStats(stats);
      setLoading(false);
    };
    getStats();
  }, []);

  return (
    <div className="stats">
      <div className="column-left">
        {/* <p> Total Items :</p> */}
        <p> Alibaba Items :</p>
        <p> Amazon Items :</p>        
        <p> West Marine Items :</p>
        <p> SVB24 Items :</p>
      </div>

      <div className="column-right">
        <ClipLoader color={"#fff"} loading={loading} />
        {/* <p>{stats.global_total_cases}</p> */}        
        {stats.map((data,index) => {          
          return <p key={index}>{data.Name}</p>
        })}                
      </div>
    </div>
  );
};

export default Statistics;
