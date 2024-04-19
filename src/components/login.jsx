import { useState } from "react";
import { useAuth } from './AuthProvider'; // Ajuste o caminho conforme necessário
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from "../config_axios";

const FormularioLogin = () => {
    const [username, setUsername] = useState("");
    const [classe, setClasse] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useAuth();

    function mudarModo(){
        if(classe === ""){
            setClasse("light-mode");
        } else {
            setClasse("")
        }
    }

    function logar(){
        var usuario = username;///verificando se o usuario esta certo
        var password = senha;

        if (usuario.trim() !== '' && password.trim() !== ''){//se estiver certo permite o acesso
            console.log("MACACADA");//eviar as informaçoes e se tudo estiver correto vai para o lugar informado 

        }else{//se não vem o alerta de que o usuario tem que preencher os campos solicitados 
            alert("Preencha os campos")
    }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (username.trim() === "" || senha.trim() === "") {
            alert("Preencha todos os campos!");
            return;
        }
    
        try {
            const response = await api.post("/login", { username, senha });
            if (response.status === 200) {
                login();
            } else {
                alert("Usuário ou senha inválidos!");
            }
        } catch (error) {
            alert("Erro ao tentar logar. Tente novamente mais tarde.");
        }
    };
    
    return (
        <div className={classe}>
        <div className="main-login">
        <div className="left-login">
            <h1>Faça seu login</h1>
            <div className="left-login-image"></div>
        </div>
        <div className="right-login">
            <div className="card-login">
                <h1>LOGIN</h1>
                <div className="textfield">
                    <label htmlFor="usuario">Usuário</label>
                    <input type="text" name="usuario" id="usuario" placeholder="Usuário" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="textfield">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" id="senha" placeholder="Senha" onChange={(e)=> setSenha(e.target.value)}/>
                </div>

                <div className="switch">
                    <label>
                        <input type="checkbox" id="modeSwitch" onChange={() => mudarModo()}/>
                        <span className="slider"></span>
                    </label>
                </div>

                <button className="btn-login" onClick={()=>logar()}>Login</button>
                <button className="btn-login" onClick={()=>logar()}>Cadastre-se</button>
            </div>
        </div>
    </div>
    </div>
    );
};

export default FormularioLogin;