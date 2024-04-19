document.querySelector('.btn-login').addEventListener('click', function() {
    var usuario = document.getElementById("usuario").value//verificando se o usuario esta certo
    var senha = document.getElementById("senha").value

    if (usuario.trim() !== '' && senha.trim() !== ''){//se estiver certo permite o acesso
        window.location.href = 'informacoes.html';//eviar as informaçoes e se tudo estiver correto vai para o lugar informado 

    }else{//se não vem o alerta de que o usuario tem que preencher os campos solicitados 
        alert("Preencha os campos")
    }

    //.trim() retira o espaço 

  });

// Selecione o botão de alternância (switch) e o corpo da página
const modeSwitch = document.getElementById("modeSwitch");
const body = document.body;

// Verifique o estado inicial do modo e defina a classe apropriada
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("light-mode");
    modeSwitch.checked = true;
} else {
    body.classList.remove("light-mode");
    modeSwitch.checked = false;
}

// Adicione um ouvinte de evento para alternar entre os modos
modeSwitch.addEventListener("change", () => {
    if (modeSwitch.checked) {
        // Ativar o modo claro
        body.classList.add("light-mode");
        localStorage.setItem("darkMode", "enabled");
    } else {
        // Ativar o modo escuro
        body.classList.remove("light-mode");
        localStorage.setItem("darkMode", null);
    }
});

