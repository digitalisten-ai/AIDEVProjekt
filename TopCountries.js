import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import PublicIcon from '@mui/icons-material/Public';
import 'chart.js/auto';

const TopCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchTopCountries = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/top_countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching top countries:', error);
      }
    };
    fetchTopCountries();
  }, []);

  const chartData = {
    labels: countries.map((country) => country['buyer country name'] || 'Unknown Country'),
    datasets: [
      {
        data: countries.map((country) => country.quantity),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
    <Card style={{ minHeight: '300px', width: '100%' }}>
      <CardContent>
        <Typography variant="h5" color="primary" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <PublicIcon style={{ marginRight: '5px' }} /> Top Countries
        </Typography>
        <Pie data={chartData} />
      </CardContent>
    </Card>
  );
};

export default TopCountries;
