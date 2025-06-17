import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import './DogCard.css';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogCardProps {
  dog: Dog;
  favorited: boolean;
  onToggleFavorite: (id: string) => void;
  disableHover?: boolean;
  onClick?: (dog: Dog) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, favorited, onToggleFavorite, disableHover, onClick }) => {
  const [animate, setAnimate] = useState(false);

  const handleDoubleClick = () => {
    onToggleFavorite(dog.id);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
  };

  return (
    <div
      onClick={() => onClick?.(dog)}
      onDoubleClick={handleDoubleClick}
      style={{ cursor: 'pointer' }}
    >
      <Card className={`dog-card ${disableHover ? 'no-hover' : ''} ${favorited ? 'favorited-card' : ''}`}>
        <CardMedia
          component="img"
          height="200"
          image={dog.img}
          alt={dog.name}
        />

        <CardContent>
          <Box className="card-bottom-row">
            <Box className="card-info">
              <Typography variant="h6" fontWeight="bold">
                {dog.name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                ✨ Breed: <strong>{dog.breed}</strong><br />
                🎂 Age: <strong>{dog.age}</strong><br />
                📍 Zip: <strong>{dog.zip_code}</strong>
              </Typography>
            </Box>

            <Box className="card-heart-column">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(dog.id);
                }}
                className="heart-button"
                disableRipple
              >
                <span className={`heart ${favorited ? 'filled' : ''} ${animate ? 'pop' : ''}`}>♥</span>
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default DogCard;