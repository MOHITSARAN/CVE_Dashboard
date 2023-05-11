import React from 'react';
import './App.css';
import AppNavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Routers from "./components/router";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppNavBar/>
          <div className="mainContainer">
            <Routers/>
          </div>
        <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
