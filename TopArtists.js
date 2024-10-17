import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const TopArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/top_artists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching top artists:', error);
      }
    };
    fetchTopArtists();
  }, []);

  return (
    <Card style={{ minHeight: '300px', width: '100%' }}>
      <CardContent>
        <Typography variant="h5" color="primary" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <PersonIcon style={{ marginRight: '5px' }} /> Top Artists
        </Typography>
        <List>
          {artists.map((artist, index) => (
            <ListItem key={index}>
              <Avatar>
                <PersonIcon />
              </Avatar>
              <ListItemText primary={artist.artist || 'Unknown Artist'} secondary={`Quantity: ${artist.quantity || 'No data'}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopArtists;
