import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import About from './Components/About';
import ViewTodo from './Components/ViewTodo';
import AddTodo from './Components/AddTodo';
import backgroundImage from './imgebackground.jpg';

function App() {
  // Define the styles for the app container
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
  };

  return (
    <Router>
      <div style={appStyle}>
        <Header />
        <div>
          <Switch>
            <Route exact path="/">
              <ViewTodo />
            </Route>
            <Route exact path="/add">
              <AddTodo />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
