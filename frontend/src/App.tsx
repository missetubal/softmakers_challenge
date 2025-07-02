import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage, RegisterPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
