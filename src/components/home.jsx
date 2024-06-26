// import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  const [menuActive, setMenuActive] = useState(false);

  function toggleMenu() {
    setMenuActive(!menuActive);
  }

  return (

    <div >



      <div className="banana">

      <nav>
        <div className={`toggle-wrap ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="toggle-bar"></span>
        </div>
      </nav>

      <aside className={menuActive ? 'active' : ''}>
        <Link to="/">Inicio</Link>
        <Link to="/agendar">Agendar Serviço</Link>
        <Link to="/agendado">Serviços agendados</Link>
      </aside>
    
      </div>



      <div className="figure">

      <figure>
        <img src="https://picsum.photos/id/287/250/300" alt="Mountains" />
        <figcaption>Serviços</figcaption>
      </figure>

      <figure style={{ "--c": "#fff5" }}>
        <img src="https://picsum.photos/id/475/250/300" alt="Mountains" />
        <figcaption>Yasmin bolla</figcaption>
      </figure>

      <figure style={{ "--c": "#fff5" }}>
        <img src="https://picsum.photos/id/475/250/300" alt="Mountains" />
        <figcaption>Agenda</figcaption>
      </figure>
        
        
      </div>


      
    </div>

  );
};

export default Home;
