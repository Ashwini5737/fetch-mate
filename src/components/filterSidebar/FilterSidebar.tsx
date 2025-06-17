import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
  breedOptions: string[];
  filterFormState: {
    selectedBreed: string;
    ageMin: string;
    ageMax: string;
    zip: string;
  };
  setFilterFormState: React.Dispatch<
    React.SetStateAction<{
      selectedBreed: string;
      ageMin: string;
      ageMax: string;
      zip: string;
    }>
  >;
  onApply: () => void;
  onClear: () => void;
}

const FilterSidebar: React.FC<Props> = ({
  open,
  onClose,
  breedOptions,
  filterFormState,
  setFilterFormState,
  onApply,
  onClear,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}  variant="temporary" ModalProps={{ keepMounted: true }} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box sx={{ width: 280, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color='#6e6e6e'  fontWeight='550'>Filters</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={2}>
          <Button
            variant="outlined"
            style={{border:'1px solid hotpink', color:'hotpink'}}
            fullWidth
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {filterFormState.selectedBreed || 'Select Breed'}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ style: { maxHeight: 300 } }}
          >
            <MenuItem
              onClick={() => {
                setFilterFormState((prev) => ({ ...prev, selectedBreed: '' }));
                setAnchorEl(null);
              }}
              selected={filterFormState.selectedBreed === ''}
            >
              All
            </MenuItem>
            {breedOptions.map((breed) => (
              <MenuItem
                key={breed}
                onClick={() => {
                  setFilterFormState((prev) => ({ ...prev, selectedBreed: breed }));
                  setAnchorEl(null);
                }}
                selected={filterFormState.selectedBreed === breed}
              >
                <ListItemText primary={breed} />
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <TextField
          label="Zip Code"
          fullWidth
          value={filterFormState.zip}
          onChange={(e) =>
            setFilterFormState((prev) => ({ ...prev, zip: e.target.value }))
          }
          sx={{ mb: 2,
            '& label.Mui-focused': {
              color: '#ff69b4', // Label color when focused
              },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: '#ff69b4', // Default border
              },
              '&:hover fieldset': {
                borderColor: '#ff1493', // On hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ff69b4', // When focused
              },
            },
            
          }}
        />

        <TextField
          label="Min Age"
          fullWidth
          value={filterFormState.ageMin}
          onChange={(e) =>
            setFilterFormState((prev) => ({ ...prev, ageMin: e.target.value }))
          }
          sx={{ mb: 2,
            '& label.Mui-focused': {
              color: '#ff69b4', 
              },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: '#ff69b4',
              },
              '&:hover fieldset': {
                borderColor: '#ff1493',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ff69b4',
              },
            },
            
          }}
        />

        <TextField
          label="Max Age"
          fullWidth
          value={filterFormState.ageMax}
          style={{color:'hotpink'}}
          onChange={(e) =>
            setFilterFormState((prev) => ({ ...prev, ageMax: e.target.value }))
          }
          sx={{ mb: 2,
            '& label.Mui-focused': {
              color: '#ff69b4',
              },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: '#ff69b4', 
              },
              '&:hover fieldset': {
                borderColor: '#ff1493', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ff69b4', 
              },
            },
            
          }}
        />

        <Button
          variant="contained"
          style={{backgroundColor:'hotpink'}}
          fullWidth
          onClick={onApply}
          sx={{ mt: 1 }}
        >
          Apply
        </Button>
        <Button 
          variant="text" 
          fullWidth onClick={onClear} sx={{ mt: 1 }}
          style={{color:'hotpink'}}>
          Clear All
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterSidebar;
