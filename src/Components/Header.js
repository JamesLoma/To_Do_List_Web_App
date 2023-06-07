import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Define custom styles using makeStyles from Material-UI
const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#007bff',
    borderRadius: '10px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  },
  navbarBrand: {
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
    marginRight: theme.spacing(2),
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  logoIcon: {
    marginRight: theme.spacing(1),
    fontSize: '2.5rem',
  },
  navbarNav: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: theme.spacing(2),
    fontSize: '1.4rem',
    borderRadius: '20px',
    padding: '10px 16px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
}));

function Header() {
  const classes = useStyles(); // Initialize the custom styles

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h6" className={classes.navbarBrand}>
          <span className={classes.logoIcon}>📝</span>
          <Link  className={classes.navbarBrand}>
            HISP-Tz TO DO LIST
          </Link>
        </Typography>
        <div className={classes.navbarNav}>
          <Typography variant="body1">
            <Link to="/" className={classes.navLink}>
              Todos
            </Link>
          </Typography>
          <Typography variant="body1">
            <Link to="/add" className={classes.navLink}>
              Add Todo
            </Link>
          </Typography>
          <Typography variant="body1">
            <Link to="/about" className={classes.navLink}>
              About
            </Link>
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
