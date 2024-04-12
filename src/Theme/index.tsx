import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'JetBrains Mono, sans-serif', 
    fontSize: 12,
    htmlFontSize: 15,
    // Example for making the h4 variant responsive
    h5: {
      fontSize: '1rem', // Default font size
      '@media (min-width:600px)': {
        fontSize: '1.25rem', // Larger font size on medium screens and up
      },
      '@media (min-width:900px)': {
        fontSize: '1.5rem', // Even larger font size on large screens and up
      },
    },
    body2: {
      fontSize: '1rem', // Default font size
      '@media (min-width:600px)': {
        fontSize: '1.25rem', // Larger font size on medium screens and up
      },
      '@media (min-width:900px)': {
        fontSize: '1.5rem', // Even larger font size on large screens and up
      },
    },
    h4: {
      fontSize: '1rem', // Default font size
      '@media (min-width:600px)': {
        fontSize: '1.25rem', // Larger font size on medium screens and up
      },
      '@media (min-width:900px)': {
        fontSize: '1.5rem', // Even larger font size on large screens and up
      },
    },
    
  },
});

export default theme;
