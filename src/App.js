import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { modalRoutes } from './utils';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Link to={`/${modalRoutes[0]}`}>
            <Button className='me-3'>Modal A</Button>
          </Link>
          <Link to={`/${modalRoutes[1]}`}>
            <Button>Modal B</Button>
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
