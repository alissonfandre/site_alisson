import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../config_axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import feather from 'feather-icons';

const AgendamentoServicos = () => {
    const { register, handleSubmit, reset, watch } = useForm();
    const [aviso, setAviso] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('00:00');
    const [servicos, setServicos] = useState(null);
    const [prestadores, setPrestadores] = useState([]);
    const [selectedServicoNome, setSelectedServicoNome] = useState('');
    const [inputDate, setInputDate] = useState('');

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await api.get('/servico');
                if (Array.isArray(response.data)) {
                    setServicos(response.data);
                    console.log('servicos:' + response.data);
                } else {
                    console.error('API retornou dados não-array para servicos:', response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar serviços', error);
            }
        };

        fetchServicos();
    }, []);

    const buscarPrestadoresPorNomeServico = async (servicoNome) => {
        if (!servicoNome) return;

        try {
            const response = await api.get(`/prestador/search?servicoNome=${servicoNome}`);
            setPrestadores(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao buscar prestadores por nome do serviço', error);
        }
    };

    const handleServicoChange = (event) => {
        const servicoEncontrado = servicos.find((servico) => servico.servico_id === parseInt(event.target.value, 10));
        const servicoNome = servicoEncontrado?.servico_nome;

        setSelectedServicoNome(event.target.value);
        buscarPrestadoresPorNomeServico(event.target.value);
    };

    const formatarData = (data) => {
        const partes = data.split('/');
        if (partes.length === 3) {
            const [dia, mes, ano] = partes;
            return `${ano}-${mes}-${dia}`;
        }
        return data;
    };

    const salvar = async (campos) => {
        try {
            const camposCompletos = {
                ...campos,
                agendamento_hora: selectedTime,
                agendamento_data: formatarData(inputDate),
                servico: {
                    servico_id: watch('agendamento_servico_id'),
                },
            };

            const response = await api.post('/agendamento', camposCompletos);
            setAviso('Agendamento realizado com sucesso!');
            reset();
        } catch (error) {
            setAviso('Erro ao realizar agendamento!');
        }
    };

    const handleDateChangeRaw = (e) => {
        const { value } = e.target;
        let formattedValue = value;

        if (value.length === 8) {
            formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}/${value.substring(4, 8)}`;
        }

        setInputDate(formattedValue);
    };

    useEffect(() => {
        feather.replace();
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Agendamento</title>
                </Helmet>
            </HelmetProvider>

            <div className="agendamento-container">
                <div className="agendamento-form">
                    <h4 className="agendamento-title">Agendamento</h4>

                    <form onSubmit={handleSubmit(salvar)}>
                        <div className="agendamento-input-container">
                            <input
                                className="agendamento-input"
                                type="search"
                                placeholder="Serviços"
                                aria-label="Serviços"
                                {...register('servicoNome')}
                            />
                            <button
                                className="agendamento-button"
                                type="button"
                                onClick={() => buscarPrestadoresPorNomeServico(watch('servicoNome'))}
                            >
                                Pesquisar
                            </button>
                        </div>

                        <label>
                            <select
                                className="agendamento-select"
                                aria-label="Default select example"
                                {...register('agendamento_servico_id')}
                                defaultValue=""
                                onChange={handleServicoChange}
                            >
                                <option value="" disabled>
                                    Selecione um serviço
                                </option>
                                {Array.isArray(servicos) &&
                                    servicos.map((servico) => (
                                        <option key={servico.servico_id} value={servico.servico_id}>
                                            {servico.servico_nome}
                                        </option>
                                    ))}
                            </select>
                        </label>

                        <label>
                            <select
                                className="agendamento-select"
                                aria-label="Selecionar Prestador"
                                {...register('prestador_id')}
                                defaultValue=""
                                disabled={!selectedServicoNome}
                            >
                                <option value="" disabled>
                                    Selecione um prestador
                                </option>
                                {prestadores.map((prestador) => (
                                    <option key={prestador.prestador_id} value={prestador.prestador_id}>
                                        {prestador.prestador_nome}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <br />

                        <label>
                            <span>Data serviço</span>

                            <div>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    onChangeRaw={handleDateChangeRaw}
                                    dateFormat="dd/MM/yyyy"
                                    value={inputDate}
                                    placeholderText="dd/mm/yyyy"
                                    className="agendamento-input"
                                />
                            </div>
                        </label>

                        <label>
                            <h6>Selecione um horário:</h6>

                            <div className="agendamento-input-container">
                                <input
                                    type="time"
                                    className="agendamento-input"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                />
                            </div>
                        </label>

                        <br />

                        <button type="submit" className="agendamento-submit">
                            Agendar
                        </button>
                    </form>

                    {aviso && <div className="agendamento-alert">{aviso}</div>}
                </div>

                <section className="images">
                    <img src={'cara da lupa.svg'} alt="Mobile" />
                    <div className="circle"></div>
                </section>
            </div>

            {/* Navbar fora do agendamento-container */}
            <div className="navbar">
                <nav>
                    <ul className="navbar__menu">
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <i data-feather="home"></i>
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <i data-feather="message-square"></i>
                                <span>Messages</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <i data-feather="users"></i>
                                <span>Customers</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <i data-feather="folder"></i>
                                <span>Projects</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <i data-feather="archive"></i>
                                <span>Resources</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <i data-feather="help-circle"></i>
                                <span>Help</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <i data-feather="settings"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default AgendamentoServicos;
