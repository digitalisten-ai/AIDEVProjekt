import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';
import AlbumIcon from '@mui/icons-material/Album';

const TopAlbums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchTopAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/top_albums');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching top albums:', error);
      }
    };
    fetchTopAlbums();
  }, []);

  return (
    <Card style={{ minHeight: '300px', width: '100%' }}>
      <CardContent>
        <Typography variant="h5" color="primary" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <AlbumIcon style={{ marginRight: '5px' }} /> Top Albums
        </Typography>
        <List>
          {albums.map((album, index) => (
            <ListItem key={index}>
              <Avatar>
                <AlbumIcon />
              </Avatar>
              <ListItemText primary={album['item name'] || 'Unknown Album'} secondary={`Quantity: ${album.quantity || 'No data'}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopAlbums;
