import { useState } from "react";
import { useAuth } from './AuthProvider'; // Ajuste o caminho conforme necessário
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from "../config_axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const FormularioLogin = () => {
    const [username, setUsername] = useState("");
    const [classe, setClasse] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useAuth();
    const [showModal, setShowModal] = useState(false);

    function mudarModo() {
        if (classe === "") {
            setClasse("light-mode");
        } else {
            setClasse("");
        }
    }

    function logar() {
        var usuario = username;
        var password = senha;

        if (usuario.trim() !== '' && password.trim() !== '') {
            console.log("MACACADA");
        } else {
            alert("Preencha os campos");
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

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCadastro = (tipo) => {
        handleCloseModal();

        if (tipo === "prestadores") {
            window.location.href = "http://localhost:5173/prestador";
        } else if (tipo === "usuarios") {
            window.location.href = "http://localhost:5173/usuario";
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
                            <input type="text" name="usuario" id="usuario" placeholder="Usuário" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="textfield">
                            <label htmlFor="senha">Senha</label>
                            <input type="password" name="senha" id="senha" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
                        </div>

                        <div className="switch">
                            <label>
                                <input type="checkbox" id="modeSwitch" onChange={() => mudarModo()} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <button className="btn-login" onClick={() => logar()}>Login</button>
                        <button className="btn-login" onClick={handleOpenModal}>Cadastre-se</button>

                    </div>
                </div>

            </div>


            <Modal show={showModal} onHide={handleCloseModal} className={`Modal ${classe}`}>
                <Modal.Header closeButton className={classe} id="close">
                    <Modal.Title>Escolha o tipo de cadastro</Modal.Title>
                </Modal.Header>

                <Modal.Body className={classe}>
                    <Button className="safada" btn="primary" onClick={() => handleCadastro("prestadores")}>Prestador</Button>{' '}
                    <Button className="safado" btn="primary" onClick={() => handleCadastro("usuarios")}>Usuário</Button>{''}
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default FormularioLogin;
