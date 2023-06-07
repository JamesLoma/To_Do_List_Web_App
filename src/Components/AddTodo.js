import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

// Define custom styles using makeStyles from Material-UI
const useStyles = makeStyles((theme) => ({
  // Styles for the container
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    marginTop: 60,
    padding: theme.spacing(4),
    borderRadius: '10px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    border: "1px solid black",
  },
  // Styles for the form title
  formTitle: {
    marginBottom: theme.spacing(4),
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#007bff',
  },
  // Styles for form elements
  formGroup: {
    marginBottom: theme.spacing(3),
  },
  formLabel: {
    display: 'block',
    marginBottom: theme.spacing(1),
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  formInput: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  formButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  // Styles for success and error messages
  successMessage: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    fontSize: '1rem',
    backgroundColor: '#dff0d8',
    borderRadius: '5px',
    color: '#3c763d',
  },
  errorMessage: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    fontSize: '1rem',
    backgroundColor: '#f8d7da',
    borderRadius: '5px',
    color: '#721c24',
  },
}));

function AddTodo() {
  const classes = useStyles(); // Initialize the custom styles
  const [title, setTitle] = useState(''); // State for todo title
  const [description, setDescription] = useState(''); // State for todo description
  const [targetDate, setTargetDate] = useState(''); // State for todo target date
  const [message, setMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

     // Check if the required fields are filled
     if (!title || !description || !targetDate) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    const auth = {
      username: 'admin',
      password: 'district',
    };

    const todo = {
      id: Date.now().toString(),
      title,
      description,
      targetDate,
      completed: false,
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    try {
      await axios.post(
        `https://dev.hisptz.com/dhis2/api/dataStore/james_loma/${todo.id}`,
        todo,
        { auth }
      );
      setTitle('');
      setDescription('');
      setTargetDate('');
      setErrorMessage('');
      setMessage('Todo successfully created');
    } catch (error) {
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
    }
   
  };

  // Render success message
  const showMessage = () => {
    if (message === '') {
      return null;
    }
    return <div className={classes.successMessage}>{message}</div>;
  };

  // Render error message
  const showErrorMessage = () => {
    if (errorMessage === '') {
      return null;
    }

    return <div className={classes.errorMessage}>{errorMessage}</div>;
  };

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit}>
        <h1 className={classes.formTitle}>Add New Todo</h1>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className={classes.formInput}
            required // Added required attribute
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className={classes.formInput}
            required // Added required attribute
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Target Date</label>
          <input
            value={targetDate}
            type="date"
            onChange={(e) => setTargetDate(e.target.value)}
            className={classes.formInput}
            required // Added required attribute
          />
        </div>
        <button type="submit" className={classes.formButton}>
          Add Todo
        </button>
      </form>
      {showMessage()} {/* Render success message */}
      {showErrorMessage()} {/* Render error message */}
    </div>
  );
}

export default AddTodo;
