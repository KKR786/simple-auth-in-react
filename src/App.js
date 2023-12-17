import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Topnav from './components/Topnav';
import Users from './pages/Users';
import { useAuthContext } from "./customHooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Topnav />
        <Routes>
          <Route path='/' element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path='/users' element={user ? <Users /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
