import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Define custom styles using makeStyles from Material-UI
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  box: {
    padding: theme.spacing(3),
    maxWidth: 400,
    borderRadius: '10px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    border: "1px solid black",
  },
  header: {
    color: '#007bff',
  },
}));

export default function About() {
  const classes = useStyles(); // Initialize the custom styles

  return (
    <div className={classes.container}>
      <Box className={classes.box}>
        <Typography variant="h4" align="center" gutterBottom className={classes.header}>
          About
        </Typography>
        <Typography variant="body1">
          This is a todo web app created for the online teaser at HIPS TZ Company. The app allows you to manage your
           tasks and stay organized.
          You can create new todo items, update existing ones, mark them as completed, and delete them when they are no 
          longer needed.
          The app provides a simple and intuitive interface to help you stay productive and keep track of your daily tasks.
        </Typography>
        <Typography variant="body1">
          On the todos page, the "Update" button enables you to update a specific todo. It will display an update form at 
          the bottom of the todos list, 
          allowing you to modify the title, description, and target date of the todo.
          The "Delete" button allows you to remove a todo from the list permanently.
          The checkbox beside each todo item is used to mark the todo as completed.
        </Typography>
      </Box>
    </div>
  );
}
