import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/top_tracks');
        setTracks(response.data);
      } catch (error) {
        console.error('Error fetching top tracks data:', error);
      }
    };
    fetchTopTracks();
  }, []);

  return (
    <Card style={{ minHeight: '300px', width: '100%' }}>
      <CardContent>
        <Typography variant="h5" color="primary" gutterBottom>
          <LibraryMusicIcon style={{ marginRight: '5px' }} />
          Top Tracks
        </Typography>
        <List>
          {tracks.map((track, index) => (
            <ListItem key={index}>
              <Avatar>
                <LibraryMusicIcon />
              </Avatar>
              <ListItemText
                primary={track.track_name || track['item name'] || 'Unknown Track'}
                secondary={`Quantity: ${track.quantity || 'No data'}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopTracks;
