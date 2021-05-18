import './App.css';
import Navbar from './components/Navbar';
import { Route , Switch} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contactuspage';
import Register from './components/Register';
import Login from './components/Login';
import Error from './components/Error'; 
import Logout from './components/Logout';
import { createContext, useReducer } from 'react';
import {initialState, reducer} from "./reducer/UseReducer";
import Footer from './components/Footer';


 //context api
 export  const userContext = createContext();
const Routing=()=>{
  return(
 <Switch>
 <Route exact path="/" component={Home}/>
 <Route exact path="/about" component={About}/>
 <Route exact path="/contact" component={Contact}/>
 <Route exact path="/register" component={Register}/>
 <Route exact path="/login" component={Login}/>
 <Route exact path="/logout" component={Logout}/>
 <Route exact component={Error}/>
 </Switch>

  )
}

function App() {
 
 const [state, dispatch] = useReducer(reducer, initialState)
  return (
   
    <>
    <userContext.Provider value={{state, dispatch}}>
     <Navbar/>
    <Routing/>
    <Footer/>
    
     </userContext.Provider>
     
    </>
  );
}

export default App;
