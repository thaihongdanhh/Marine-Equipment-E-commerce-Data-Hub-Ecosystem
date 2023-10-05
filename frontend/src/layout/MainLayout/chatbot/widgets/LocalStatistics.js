import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { getData2 } from "../data";

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const stats = await getData2();

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
        <p> Alibaba Images :</p>
        <p> Amazon Images :</p>        
        <p> West Marine Images :</p>
        <p> SVB24 Images :</p>
      </div>

      <div className="column-right">
        <ClipLoader color={"#fff"} loading={loading} />
        {/* <p>{stats.global_total_cases}</p> */}        
        {stats.map((data,index) => {          
          return <p key={index}>{data.name}</p>
        })}                
      </div>
    </div>
  );
};

export default Statistics;
