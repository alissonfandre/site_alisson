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
    <div className="classe">

       <h1>Agende um serviço</h1>

        <form action="">

          <div className="wrapper"> 

            <label htmlFor="categoria">
                <span>categoria</span>
                <select id="categoria" name="categoria" >
                  <option value="">selecione</option>
                  <option value="dinheiro">encanador</option>
                  <option value="cartao_debito">misterios</option>
                  <option value="cartao_credito">jardineiro</option>
                  <option value="pix">eletricista</option>
                </select>
              </label>

            <label htmlFor="data_servico">
                <span>data serviço</span>
                <input type="date" id="data_servico" name="data servico" placeholder="dd/mm/aa"/>
            </label>
            
            <label htmlFor="payment">
                <span>Pagamento</span>
                <select id="payment" name="payment" >
                  <option value="">selecione</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao_debito">Cartão de Débito</option>
                  <option value="cartao_credito">Cartão de Crédito</option>
                  <option value="pix">PIX</option>
                </select>
              </label>

                          
            <label htmlFor="prestador">
                <span>Prestador</span>
                <select id="prestador" name="prestador" >
                  <option value="">selecione</option>
                  <option value="fred">fred</option>
                  <option value="scooby">scooby</option>
                  <option value="scooby">salsicha</option>
                  <option value="daphine">daphine</option>
                  <option value="velma">velma</option>
                </select>
              </label>

              
            <label htmlFor="hora">
                <span>Hora</span>
                <input type="time" id="hora" name="hora"/>
            </label>


            </div>

            <input type="submit" value="Confirma" id="button"/>
        </form>

    </div>

    </main>
    <section className="images">
        <img src={'cara da lupa.svg'} alt="Mobile"/>
        <div className="circle"></div>
    </section>
    </body>
  )
}

export default agendar_servicos;