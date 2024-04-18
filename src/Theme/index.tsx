import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'JetBrains Mono, sans-serif',
    // Base font size for smallest devices
    fontSize: 12,
    htmlFontSize: 20, // Adjusted for better scaling
    h1: {
      fontSize: '2.3rem', // smaller for small screens
      '@media (min-width:600px)': {
        fontSize: '4rem', // medium screens
      },
      '@media (min-width:900px)': {
        fontSize: '4.5rem', // large screens
      },
      '@media (min-width:1200px)': {
        fontSize: '6rem', // extra large screens
      },
    },
    h2: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontSize: '1.25rem',
      '@media (min-width:600px)': {
        fontSize: '1.75rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2rem',
      },
    },
    h4: {
      fontSize: '1.125rem',
      '@media (min-width:600px)': {
        fontSize: '1.375rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.125rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontSize: '0.875rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.125rem',
      },
    },
    body1: {
      fontSize: '0.875rem',
      '@media (min-width:600px)': {
        fontSize: '0.9375rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1rem',
      },
    },
    body2: {
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.3rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.5rem',
      },
    },
    button: {
      fontSize: '0.875rem', // Consider smaller button text on small devices
      '@media (min-width:600px)': {
        fontSize: '0.9375rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1rem',
      },
    },
    // Include other variants like subtitle1, subtitle2, caption, overline if needed
  },
});

export default theme;
