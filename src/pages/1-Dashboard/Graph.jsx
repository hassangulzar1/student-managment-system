import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const Graph = ({ Data }) => {
  return (
    <>
      <BarChart width={730} height={250} data={Data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="courseName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="present" fill="green" />
        <Bar dataKey="absent" fill="red" />
      </BarChart>
    </>
  );
};

export default Graph;
