import logo from './logo.svg';
import './App.css';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import ForgotPassword from './components/pages/ForgotPassword';
import React from 'react';
import { BrowserRouter,Routes,Route, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {ExpenseContextProvider} from './store/expense-context'

function App() {
  const [token,setToken] = useState('');
  const [login,setLogin] = useState(false);

  useEffect(()=>{
    const userToken = localStorage.getItem('userCurr');
    //console.log(userToken);
    if(!userToken===''){
      setToken(userToken);
      setLogin(true);
    }
    
  },[login])
  return (
    <div className='App'>
      <ExpenseContextProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/forgot' element={<ForgotPassword/>}/>
      </Routes>
      </ExpenseContextProvider>
    </div>     
     
  );
}

export default App;
