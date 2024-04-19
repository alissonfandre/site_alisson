import React from "react";

const cadastrar_usuario = () =>{
  return(
    <body>
    <main>
    <div>
       <h1>Cadastre-se</h1>
        <div className="social-media">
            <a href="#">
                <img src={'google.png'} alt="Google"/>
            </a>
            <a href="#">
                <img src={'facebook.png'} alt="Facebook"/>
            </a>
            <a href="#">
                <img src={'linkedin.png'} alt="Linkedin"/>
            </a>
        </div>

        <div className="alternative">
            <span>OU</span>
        </div>

        <form action="">
            <label htmlFor="name">
                <span>Nome</span>
                <input type="text" id="name" name="name" placeholder="Nome"/>
            </label>

            <label htmlFor="email">
                <span>E-mail</span>
                <input type="email" id="email" name="email" placeholder="exemplo@gmail.com"/>
            </label>

            <label htmlFor="password">
                <span>Senha</span>
                <input type="password" id="password" name="password" placeholder="senha"/>
            </label>

            <input type="submit" value="Cadastre" id="button"/>
        </form>
    </div>
    </main>
    <section className="images">
        <img src={'cara da pen.svg'} alt="Mobile"/>
        <div className="circle"></div>
    </section>
    </body>
  )
}

export default cadastrar_usuario;