import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AuthContext } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL

export default function HomeFeed() {
  const [data, setData] = useState([]);
  const { authTokens } = useContext(AuthContext);

  const fetchData = async () => {
    const response = await fetch(`${API_URL}/su/monthly_post_count/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
    });
    const jsonData = await response.json();
    setData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  console.log(data)
  const chartColors = ['#8884d8']; // Customize the color here

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill={chartColors[0]} />
    </BarChart>
  );
}
