import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ResultMatchDialog.css';

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
  dog: Dog | null;
  onClose: () => void;
  onClick?: () => void;
}

const ResultMatchDialog: React.FC<Props> = ({ open, dog, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} className="match-dialog" maxWidth="sm" fullWidth>
      <Box className="match-title-wrapper">
        <DialogTitle className="match-title">
          🎉 It’s a Pawfect Match!
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          className="match-close"
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent className="match-body">
        {dog ? (
          <Box className="match-card">
            <img
              src={dog.img}
              alt={dog.name}
              className="match-image"
            />
            <Box className="match-info">
              <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                {dog.name}
              </Typography>
              <Typography variant="body1" align="center">
                ✨ <strong>{dog.breed}</strong> &nbsp; 🎂 <strong>Age:</strong> {dog.age} &nbsp; 📍 <strong>Zip:</strong> {dog.zip_code}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography>No match found.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResultMatchDialog;