import Cadastrar_Prestador from './components/cadastrar_prestador';
import Menu_Superior from './components/MenuSuperior';
import Manutencao_Tarefas from './components/manutencao_tarefas';
import FormularioLogin from './components/login';
import Cadastrar_Usuarios from './components/cadastrar_usuario';
import Agendamento_servicos from "./components/agendamento_servicos";
import Home from './components/home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './components/AuthProvider';
import './css/index.css';
import './css/cadastro.css';
import './css/prestador.css';
import './css/agendar.css';
import './css/home.css';
import './css/navbar.css';



const ProtectedRoute = ({ children }) => {
    const { autenticado } = useAuth();
    return autenticado ? children : <Navigate to="/login" />;
};

const RoutesWithAuth = () => {
    const { autenticado } = useAuth();

    return (
        <Router>
            {autenticado && <Menu_Superior />}
            <Routes>
                <Route path="/login" element={<FormularioLogin />} />
                <Route path="/" element={autenticado ? <Navigate to="/tarefas" /> : <FormularioLogin />} />
                <Route path="/prestador" element={<Cadastrar_Prestador />} />
                <Route path="/agendar" element={<Agendamento_servicos />} />
                <Route path="/manutencao" element={<ProtectedRoute><Manutencao_Tarefas /></ProtectedRoute>} />
                <Route path="/usuario" element={<Cadastrar_Usuarios />} />
                <Route path="/home" element={<Home/>} />
                

            </Routes>
        </Router>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <RoutesWithAuth/>
        </AuthProvider>
    );
};
  
export default App;