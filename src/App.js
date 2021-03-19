import './App.css';
import { Home } from './components/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Todolist } from './components/TodoList';

const Routing = ()=>{
  return(
    <Switch>
       <Route path='/' exact component={Home}/>        
        <Route path='/user/:userid' component={Todolist}/>
    </Switch>
  );
}


function App() {
  return (
    <div className="App">
      <Router>
        <Routing/>
      </Router>
      
    </div>
  );
}

export default App;
