import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import About from './Components/About';
import ViewTodo from './Components/ViewTodo';
import AddTodo from './Components/AddTodo';


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div>
          <Switch>
            

            <Route exact path = "/">
            <ViewTodo/>
            </Route>

            <Route exact path = "/add">
            <AddTodo/>
            </Route>

            <Route exact path = "/about">
            <About/>
            </Route>

            
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
