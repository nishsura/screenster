import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914', // Netflix Red
    },
    secondary: {
      main: '#f40612', // Slightly brighter red
    },
    background: {
      default: '#141414', // Dark background
      paper: '#1a1a1a',   // Slightly lighter dark for cards/surfaces
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b3b3b3', // Light grey text
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: {
      fontSize: '4.5rem',
      fontWeight: 900,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 300,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 25px rgba(229, 9, 20, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: '#e50914',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e50914',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b3b3b3',
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(26, 26, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(229, 9, 20, 0.1)',
          color: '#e50914',
          border: '1px solid rgba(229, 9, 20, 0.3)',
        },
      },
    },
  },
});

export default theme;
