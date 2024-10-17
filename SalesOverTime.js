import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import TimelineIcon from '@mui/icons-material/Timeline';

const SalesOverTime = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/sales_over_time');
                setSalesData(response.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };
        fetchSalesData();
    }, []);

    const lineData = {
        labels: salesData.map(sale => new Date(sale.date).toLocaleDateString()),
        datasets: [{
            label: 'Sales Over Time',
            data: salesData.map(sale => sale.quantity),
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.1,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Quantity',
                },
                min: 0,
                max: Math.max(...salesData.map(sale => sale.quantity)) + 10,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <Card style={{ minHeight: '300px', width: '100%' }}>
            <CardContent sx={{ padding: '8px' }}> {/* Mindre padding */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                    <TimelineIcon style={{ color: '#4285F4', marginRight: '6px', fontSize: '20px' }} /> {/* Mindre ikon */}
                    <Typography variant="h6" color="primary" sx={{ fontSize: '18px' }}> {/* Mindre textstorlek */}
                        Sales Over Time
                    </Typography>
                </div>
                <div style={{ height: '300px', maxHeight: '400px', width: '100%' }}> {/* Justerat för en mindre höjd */}
                    <Line data={lineData} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};

export default SalesOverTime;
