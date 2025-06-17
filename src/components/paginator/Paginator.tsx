import React from 'react';
import { Button, Box } from '@mui/material';
import './Paginator.css';

interface Props {
  hasNext: boolean;
  hasPrev: boolean;
  onPaginate: (direction: 'next' | 'prev') => void;
}

const Paginator: React.FC<Props> = ({ hasNext, hasPrev, onPaginate }) => {

  return (
    <Box className="paginator-container">
      <Button
        variant="outlined"
        disabled={!hasPrev}
        onClick={() => onPaginate('prev')}
        className="paginator-button"
        style={hasPrev ? {border:'1px solid hotpink', color:'hotpink'} :{border:'', color:''}}
      >
        Previous
      </Button>
      <Button
        variant="outlined"
        disabled={!hasNext}
        onClick={() => onPaginate('next')}
        className="paginator-button"
        style={hasNext ? {border:'1px solid hotpink', color:'hotpink'} :{border:'', color:''}}
      >
        Next
        
      </Button>
    </Box>
  );
};

export default Paginator;
