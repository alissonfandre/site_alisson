import React from "react";

const agendar_servicos = () =>{


    const handleCPF = (event) => {
        function cpfMask(value){
          if (!value) return "";
          value = value.replace(/\D/g,'');
          if(value.length <= 6){
            value = value.replace(/^(\d{3})(\d)/, '$1.$2');
          } else if (value.length <= 9){
            value = value.replace(/^(\d{3})(\d{3})(\d)/, '$1.$2.$3');
          } else {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
          };
          return value;
        }
        let input = event.target;
        input.value = cpfMask(input.value);
      };

      const handleTelefone = (event) => {
        function telefoneMask(value){
          if (!value) return "";
          value = value.replace(/\D/g,'');
          if(value.length <= 8){
            value = value.replace(/^(\d{2})(\d)/, '($1) $2');
          } else{
            value = value.replace(/^(\d{2})(\d{5})(\d)/, '($1) $2-$3');
          };
        
          return value;
        }
        let input = event.target;
        input.value = telefoneMask(input.value);
      };


  return(
    <body>
    <main>
    <div>

       <h1>Agende um serviço</h1>
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

          <div className="wrapper"> 

            <label htmlFor="name">
                <span>Nome</span>
                <input type="text" id="name" name="name" placeholder="Nome"/>
            </label>

            
            <label htmlFor="email">
                <span>E-mail</span>
                <input type="email" id="email" name="email" placeholder="exemplo@gmail.com"/>
            </label>

            <label htmlFor="cpf">
                <span>Cpf</span>
                <input type="cpf" 
                id="cpf" 
                name="cpf" 
                placeholder="000-000-000-00" 
                onKeyUp={handleCPF} 
                maxLength={14}/>
            </label>

            <label htmlFor="data_nascimento">
                <span>data nascimento</span>
                <input type="date" id="data_nascimento" name="data nascimento" placeholder="dd/mm/aa"/>
            </label>

            <label htmlFor="Telefone">
                <span>Telefone</span>
                <input type="telefone" 
                id="telefone" 
                name="telefone" 
                placeholder="(00)00000-0000" 
                onKeyUp={handleTelefone}
                maxLength={15}/>
            </label>

            <label htmlFor="password">
                <span>Senha</span>
                <input type="password" id="password" name="password" placeholder="senha"/>
            </label>


            </div>

            <input type="submit" value="Cadastre" id="button"/>
        </form>

    </div>

    </main>
    <section className="images">
        <img src={'cara do contrato.svg'} alt="Mobile"/>
        <div className="circle"></div>
    </section>
    </body>
  )
}

export default agendar_servicos;