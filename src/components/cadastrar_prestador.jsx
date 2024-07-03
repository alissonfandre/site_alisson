import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../config_axios";


const cadastrar_prestador = () => {

  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      console.log(campos)
      const response = await api.post("/prestador", campos);
      setAviso(`Prestador cadastrado com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar prestador!");
    }
  };

  const handleCPF = (event) => {
    function cpfMask(value) {
      if (!value) return "";
      value = value.replace(/\D/g, '');
      if (value.length <= 6) {
        value = value.replace(/^(\d{3})(\d)/, '$1.$2');
      } else if (value.length <= 9) {
        value = value.replace(/^(\d{3})(\d{3})(\d)/, '$1.$2.$3');
      } else {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
      };
      return value;
    }
    let input = event.target;
    input.value = cpfMask(input.value);
  };


  // const handleTelefone = (event) => {
  //   function telefoneMask(value){
  //     if (!value) return "";
  //     value = value.replace(/\D/g,'');
  //     if(value.length <= 8){
  //       value = value.replace(/^(\d{2})(\d)/, '($1) $2');
  //     } else{
  //       value = value.replace(/^(\d{2})(\d{5})(\d)/, '($1) $2-$3');
  //     };

  //     return value;
  //   }
  //   let input = event.target;
  //   input.value = telefoneMask(input.value);
  // };


  return (
    <body>
      <main>
        <div>

          <h1>Torne-se um prestador</h1>
          <div className="social-media">

            <a href="#">
              <img src={'google.png'} alt="Google" />
            </a>
            <a href="#">
              <img src={'facebook.png'} alt="Facebook" />
            </a>
            <a href="#">
              <img src={'linkedin.png'} alt="Linkedin" />

            </a>
          </div>

          <div className="alternative">
            <span>OU</span>
          </div>

          <form onSubmit={handleSubmit(salvar)}>

            <div className="wrapper">

              <label htmlFor="prestador_nome">
                <span>Nome</span>
                <input type="text" id="prestador_nome" name="prestador_nome" placeholder="Nome" {...register("prestador_nome")} />
              </label>


              <label htmlFor="prestador_email">
                <span>E-mail</span>
                <input type="email" id="prestador_email" name="prestador_email" placeholder="exemplo@gmail.com" {...register("prestador_email")} />
              </label>

              <label htmlFor="prestador_cpf">
                <span>Cpf</span>
                <input type="cpf"
                  id="prestador_cpf"
                  name="prestador_cpf"
                  placeholder="000.000.000-00"
                  onKeyUp={handleCPF}
                  maxLength={14}
                  {...register("prestador_cpf")} />
              </label>

              <label htmlFor="prestador_cnpj">
                <span>Cnpj</span>
                <input type="Cnpj" id="prestador_cnpj" name="prestador_cnpj" placeholder="XX. XXX. XXX/0001-XX" {...register("prestador_cnpj")} />
              </label>

              <label htmlFor="prestador_razao_social">
                <span>Razao Social</span>
                <input type="Razao_social" id="prestador_razao_social" name="prestador_razao_social" placeholder="Nome da empresa" {...register("prestador_razao_social")} />
              </label>

              {/* <label htmlFor="Telefone">
                <span>Telefone</span>
                <input type="telefone" 
                id="telefone" 
                name="telefone" 
                placeholder="(00)00000-0000" 
                onKeyUp={handleTelefone}
                maxLength={15}/>
            </label> */}

              <label htmlFor="prestador_senha">
                <span>Senha</span>
                <input type="password" id="prestador_senha" name="prestador_senha" placeholder="senha" {...register("prestador_senha")} />
              </label>


            </div>

            <input type="submit" value="Cadastre" id="button" />
          </form>

        </div>

      </main>
      <section className="images">
        <img src={'cara do contrato.svg'} alt="Mobile" />
        <div className="circle"></div>
      </section>
    </body>
  )
}

export default cadastrar_prestador;