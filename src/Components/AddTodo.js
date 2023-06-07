import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    marginTop: 60,
    padding: theme.spacing(4),
    borderRadius: '10px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    
  },
  formTitle: {
    marginBottom: theme.spacing(4),
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#007bff',
  },
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
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const auth = {
      username: 'admin',
      password: 'district',
    };

    const todo = {
       id:Date.now().toString(),
       title,
       description,
       targetDate, 
       completed:false,
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

  const showMessage = () => {
    if (message === '') {
      return null;
    }
    return (
      <div className={classes.successMessage}>
        {message}
      </div>
    );
  };

  const showErrorMessage = () => {
    if (errorMessage === '') {
      return null;
    }

    return (
      <div className={classes.errorMessage}>
        {errorMessage}
      </div>
    );
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
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className={classes.formInput}
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Target Date</label>
          <input
            value={targetDate}
            type="date"
            onChange={(e) => setTargetDate(e.target.value)}
            className={classes.formInput}
          />
        </div>
        <button type="submit" className={classes.formButton}>Add Todo</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
  );
}

export default AddTodo;
