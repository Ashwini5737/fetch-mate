import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DogCard from '../dogCard/DogCard';
import './FavoritesDrawer.css';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  dogs: Dog[];
  onMatch: () => void;
  onToggleFavorite: (id: string) => void; 
  onClearFavorites: () => void; 
}

const FavoritesDrawer: React.FC<Props> = ({ open, onClose, dogs, onMatch, onToggleFavorite, onClearFavorites }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className="favorites-drawer">
        <Box className="favorites-header">
          <Typography variant="h5" color='#6e6e6e'  fontWeight='550'>Favorites</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {dogs.length === 0 ? (
          <Typography variant="h6" color='#6e6e6e'  fontWeight='400'>No favorites yet.</Typography>
        ) : (
          dogs.map((dog) => (
            <Box key={dog.id} className="favorites-card">
              <DogCard dog={dog} favorited={true} onToggleFavorite={onToggleFavorite} />
            </Box>
          ))
        )}

        {dogs.length > 0 && (
          <>
            <Button
              variant="contained"
              style={{backgroundColor:'hotpink'}}
              onClick={onMatch}
              sx={{ mt: 2 }}
            >
              Generate Match
            </Button>
            <Button
              variant="text"
              onClick={onClearFavorites}
              style={{color:'hotpink'}}
            >
              Clear Favorites
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default FavoritesDrawer;
