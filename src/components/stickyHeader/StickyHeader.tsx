import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './StickyHeader.css';

interface Props {
  onOpenFavorites: () => void;
  onMatch: () => void;
  favoriteCount: number;
  user: { name: string; email: string };
  onLogout: () => void;
}

const StickyHeaderLayout: React.FC<Props> = ({
  onOpenFavorites,
  onMatch,
  favoriteCount,
  user,
  onLogout,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <AppBar position="sticky" color="default" className="sticky-header">
      <Toolbar className="sticky-header-toolbar">
        <Box className="sticky-header-left">
          <span style={{ fontSize: '2.2rem', paddingBottom: '5px' }}>🐶</span>
          <Typography variant="h4" className="search-title">
           FetchMate 
          </Typography>
        </Box>

        <Box className="sticky-header-right">
            <Tooltip
              title={favoriteCount ? 'Find your best dog match' : 'Add dogs to favorites to match'}
              arrow
            >
              <span> 
                <Button
                  style={favoriteCount ? {backgroundColor:'hotpink'}: {backgroundColor: ''}}
                  variant="contained"
                  onClick={onMatch}
                  disabled={!favoriteCount}
                >
                  Match
                </Button>
              </span>
            </Tooltip>
            

          <Button variant="outlined" style={{border:`1px solid hotpink`, color:`hotpink`}} onClick={onOpenFavorites}>
            Favorites ({favoriteCount})
          </Button>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <Box className="user-info">
              <span className="name">{user.name}</span>
              <span className="email">{user.email}</span>
            </Box>
            <MenuItem onClick={onLogout}>
              <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StickyHeaderLayout;
