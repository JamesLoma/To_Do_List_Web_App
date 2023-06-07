import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  appContainer: {
    textAlign: "center",
    padding: theme.spacing(2),
  },
  todoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: theme.spacing(2),
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  header: {
    marginBottom: theme.spacing(4),
    color: "#007bff",
  },
  todoList: {
    listStyle: "none",
    paddingLeft: 0,

  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    textDecoration: "none",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    padding: theme.spacing(2),
    maxWidth: "1200px",

  },
  columnHeader: {
    fontWeight: "bold",
    color: "#007bff",
  },
  todoTitle: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "left",
  },
  todoDescription: {
    flex: 2,
    textAlign: "left",
  },
  todoDate: {
    flex: 1,
    marginLeft: theme.spacing(2),
    textAlign: "left",
  },
  updateForm: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  updateInput: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    marginBottom: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
    borderRadius: "20px",
    textTransform: "none",
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  completedTodo: {
    opacity: 0.6,
  },
}));

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [todoToUpdate, setTodoToUpdate] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://dev.hisptz.com/dhis2/api/dataStore/james_loma?fields=.",
        {
          auth: {
            username: "admin",
            password: "district",
          },
        }
      );

      if (response.data.entries) {
        setTodos(response.data.entries.map((entry) => entry.value));
      }

      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  function handleUpdate(todo) {
    setTodoToUpdate(todo);
    setUpdatedTitle(todo.title);
    setUpdatedDescription(todo.description);
    setUpdatedDate(todo.targetDate);
  }

  async function handleDelete(todo) {
    try {
      await axios.delete(
        `https://dev.hisptz.com/dhis2/api/dataStore/james_loma/${todo.id}`,
        {
          auth: {
            username: "admin",
            password: "district",
          },
        }
      );
      setTodos(todos.filter((item) => item !== todo));
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  }

  async function handleComplete(todo) {
    const todostatus = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      targetDate: todo.targetDate,
      completed: !todo.completed,
      created: todo.created,
      lastUpdated: todo.lastUpdated,
    };
    try {
      await axios.put(
        `https://dev.hisptz.com/dhis2/api/dataStore/james_loma/${todo.id}`,
        todostatus,
        {
          auth: {
            username: "admin",
            password: "district",
          },
        }
      );
      setCompletedTodos([...completedTodos, todo]);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
    fetchTodos();
  }

  async function handleUpdateTodo() {
    try {
      await axios.put(
        `https://dev.hisptz.com/dhis2/api/dataStore/james_loma/${todoToUpdate.id}`,
        {
          ...todoToUpdate,
          title: updatedTitle,
          description: updatedDescription,
          targetDate: updatedDate,
        },
        {
          auth: {
            username: "admin",
            password: "district",
          },
        }
      );
      const updatedTodos = todos.map((todo) =>
        todo === todoToUpdate
          ? {
              ...todo,
              title: updatedTitle,
              description: updatedDescription,
              targetDate: updatedDate,
            }
          : todo
      );
      setTodos(updatedTodos);
      setTodoToUpdate(null);
      setUpdatedTitle("");
      setUpdatedDescription("");
      setUpdatedDate("");
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // ...

return (
  <div className={classes.appContainer}>
    <div className={classes.todoContainer}>
      <Typography variant="h4" component="h1" className={classes.header}>
        Your Ultimate To-Do List
      </Typography>
      <ul className={classes.todoList}>
        {/* <li className={classes.todoItem}>
          <Typography variant="body1" className={classes.columnHeader}>
            Title
          </Typography>
          <Typography variant="body1" className={classes.columnHeader}>
            Description
          </Typography>
          <Typography variant="body1" className={classes.columnHeader}>
            Date
          </Typography>
          <div></div>
        </li> */} 
        {todos.map((todo, index) => {
          const isCompleted = completedTodos.includes(todo);
          return (
            <li
              key={index}
              className={`${classes.todoItem} ${
                isCompleted ? classes.completedTodo : ""
              }`}
            >
              <Typography variant="body1" className={classes.todoTitle}>
                {todo.title}
              </Typography>
              <Typography variant="body1" className={classes.todoDescription}>
                {todo.description}
              </Typography>
              <Typography variant="body1" className={classes.todoDate}>
                {todo.targetDate}
              </Typography>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<EditIcon className={classes.icon} />}
                  onClick={() => handleUpdate(todo)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon className={classes.icon} />}
                  onClick={() => handleDelete(todo)}
                >
                  Delete
                </Button>
                <Checkbox
                  checked={todo.completed}
                  color="primary"
                  onChange={() => handleComplete(todo)}
                  inputProps={{ "aria-label": "todo complete checkbox" }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {error && (
        <Typography variant="body1" className={classes.error}>
          Error: {error}
        </Typography>
      )}
      {todoToUpdate && (
        <div className={classes.updateForm}>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className={classes.updateInput}
          />
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className={classes.updateInput}
          />
          <input
            type="text"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            className={classes.updateInput}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateTodo}
            className={classes.button}
            startIcon={<DoneIcon className={classes.icon} />}
          >
            Update
          </Button>
        </div>
      )}
    </div>
  </div>
);

}

export default App;