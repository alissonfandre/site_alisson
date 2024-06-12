import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../config_axios";

const cadastrar_usuario = () =>{
  
    const { register, handleSubmit,reset } = useForm();
    const [aviso, setAviso] = useState("");
  
    const salvar = async (campos) => {
      try {
        console.log(campos)
        const response = await api.post("/usuarios", campos);
        setAviso(`Usuário cadastrado com sucesso!"`);
        reset();
      } catch (error) {
        setAviso("Erro ao cadastrar usuário!");
      }
    };

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

        <form onSubmit={handleSubmit(salvar)}>

          <div className="wrapper"> 

            <label htmlFor="usuario_nome">
                <span>Nome</span>
                <input type="text" id="usuario_nome" name="usuario_nome" placeholder="Nome"   {...register("usuario_nome")}/>
            </label>

            
            <label htmlFor="usuario_email">
                <span>E-mail</span>
                <input type="email" id="usuario_email" name="usuario_email" placeholder="exemplo@gmail.com"  {...register("usuario_email")}/>
            </label>

            <label htmlFor="usuario_cpf">
                <span>Cpf</span>
                <input type="cpf" 
                id="usuario_cpf" 
                name="usuario_cpf" 
                placeholder="000-000-000-00" 
                onKeyUp={handleCPF} 
                maxLength={11}
                {...register("usuario_cpf")}/>
            </label>

            <label htmlFor="usuario_data_nascimento">
                <span>data nascimento</span>
                <input type="date" id="usuario_data_nascimento" name="usuario_data_nascimento" placeholder="dd/mm/aa"  {...register("usuario_data_nascimento")}/>
            </label>


            <label htmlFor="usuario_senha">
                <span>Senha</span>
                <input type="password" id="usuario_senha" name="usuario_senha" placeholder="senha"  {...register("usuario_senha")}/>
            </label>


            </div>

            <input type="submit" value="Cadastre-se" id="button"/>
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