import React from 'react';
import ImageSvg from './image5.svg';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Image5 = () => {
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      <img
        src={ImageSvg}
        alt="Image5"
        style={{
          width: '100%', // Always take 100% of the container width
          maxHeight: isTabletOrSmaller ? '50vh' : '70vh', // Scale the height based on the viewport height
          height: 'auto' // Maintain aspect ratio
        }}
      />
    </div>
  );
};

export default Image5;
