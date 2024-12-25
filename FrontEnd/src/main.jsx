import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './component/SignUp.jsx';
import TodosApp from './todoApp/TodosApp.jsx';
import Login from './component/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        
        <Route path="/" element={<SignUp />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/todo-app" element={<TodosApp />} />
      </Routes>
    </Router>
  </StrictMode>
);
