import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Home = () => {
    const [menuActive, setMenuActive] = useState(false);
  
    function toggleMenu() {
      setMenuActive(!menuActive);
    }
  
    return (
      <div className="banana">

        <nav>
          <div className={`toggle-wrap ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
            <span className="toggle-bar"></span>
          </div>
        </nav>
        
        <aside className={menuActive ? 'active' : ''}>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
        </aside>

      </div>
    );
  };
  
  export default Home;
