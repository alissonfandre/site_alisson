import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import React from 'react';

const AgendamentoServicos = () => {
    const { register, handleSubmit, reset, watch } = useForm();
    const [aviso, setAviso] = useState("");
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedTime, setSelectedTime] = useState("00:00");
    const [servicos, setServicos] = useState([]);
    const [prestadores, setPrestadores] = useState([]);
    const [selectedServicoNome, setSelectedServicoNome] = useState("");
    const [inputDate, setInputDate] = React.useState('');

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await api.get("/servico");
                setServicos(response.data);
            } catch (error) {
                console.error("Erro ao buscar serviços", error);
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
            console.error("Erro ao buscar prestadores por nome do serviço", error);
        }
    };

    const handleServicoChange = (event) => {
        console.log("Event target value:", event.target.value);
        console.log("Servicos array:", servicos); // Log do array servicos
    
         const servicoEncontrado = servicos.find(servico => servico.servico_id === parseInt(event.target.value, 10));        
         console.log("Servico encontrado:", servicoEncontrado); // Log do serviço encontrado
    
        const servicoNome = servicoEncontrado?.servico_nome;
        console.log("Servico Nome:", servicoNome);
    
        setSelectedServicoNome(event.target.value);
        
        buscarPrestadoresPorNomeServico(event.target.value);
    };


    const salvar = async (campos) => {
        try {
            // Adiciona os campos agendamento_hora e agendamento_servico_id ao objeto campos
            const camposCompletos = {
                 ...campos,
                agendamento_hora: selectedTime,
                agendamento_data: "2024-05-09",
                servico:{
                    
                    servico_id:watch("agendamento_servico_id")
                }
               

                // agendamento_hora: selectedTime,
                // agendamento_servico_id: { servico_id: watch("servico_id") },
                // agendamento_usuario_id: { usuario_id : 1},
                // agendamento_observacao: 'leite'
    //             "agendamento_data": "2024-05-09",
    // "agendamento_hora": "22:00",
    // "agendamento_observacao":"bunda",
    // "agendamento_status":"PENDENTE",
    // "agendamento_usuario_id":{
    //     "usuario_id": 1
    // },
    // "agendamento_servico_id":{
    //     "servico_id": 2
    // }
            };

            console.log("camposCompletos"+camposCompletos);
            const response = await api.post("/agendamento", camposCompletos);
            setAviso("Agendamento realizado com sucesso!");
            reset();
        } catch (error) {
            setAviso("Erro ao realizar agendamento!");
        }
    };

    useEffect(() => {
        console.log("Servicos:", servicos);
    }, [servicos]);

    const handleDateChangeRaw = (e) => {
        const { value } = e.target;
        let formattedValue = value;

        if (value.length === 8) {
            formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}/${value.substring(4, 8)}`;
        }

        setInputDate(formattedValue);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <Helmet>
                <title>Agendamento</title>
            </Helmet>

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
                                {...register("servicoNome")}
                            />
                            <button
                                className="agendamento-button"
                                type="button"
                                onClick={() => buscarPrestadoresPorNomeServico(watch("servicoNome"))}
                            >
                                Pesquisar
                            </button>
                        </div>

                        <label>
                            <select
                                className="agendamento-select"
                                aria-label="Default select example"
                                {...register("agendamento_servico_id")}
                                defaultValue=""
                                onChange={handleServicoChange}
                            >
                                <option value="" disabled>Selecione um serviço</option>
                                {servicos.map(servico => (
                                    <option key={servico.servico_id} value={servico.servico_id}>{servico.servico_nome}</option>
                                ))}
                            </select>
                        </label>

                        <label>

                            <select
                                className="agendamento-select"
                                aria-label="Selecionar Prestador"
                                {...register("prestador_id")}
                                defaultValue=""
                                disabled={!selectedServicoNome}
                            >
                                <option value="" disabled>Selecione um prestador</option>
                                {prestadores.map((prestador) => (
                                    <option key={prestador.prestador_id} value={prestador.prestador_id}>{prestador.prestador_nome}</option>
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

                        <button type="submit" className="agendamento-submit">Agendar</button>

                    </form>

                    <div className="agendamento-alert">{aviso}</div>

                </div>


                <section className="images">
                    <img src={'cara da lupa.svg'} alt="Mobile" />
                    <div className="circle"></div>
                </section>

            </div>

        </>
    );
};

export default AgendamentoServicos;
