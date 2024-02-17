import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserState from './context/user/userState';
import { useState } from 'react';

function App() {
  //Setting the Alert
  const [alert, setAlert] = useState(null);
  const [status, setStatus] = useState(localStorage.getItem('token') ? 'Logout' : 'Login');
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <UserState>
        <NoteState>
          <Router>
            <Navbar status={status} />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route path='/' element={<Home showAlert={showAlert} />} />
                <Route path='/about' element={<About showAlert={showAlert} />} />
                <Route path='/login' element={<Login setStatus={setStatus} showAlert={showAlert} />} />
                <Route path='/signup' element={<SignUp setStatus={setStatus} showAlert={showAlert} />} />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </UserState>
    </>
  );
}

export default App;
