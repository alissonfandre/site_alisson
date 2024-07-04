import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";

const agendamento_servicos = () => {
    const { register, handleSubmit, reset, watch } = useForm();
    const [aviso, setAviso] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("00:00");
    const [servicos, setServicos] = useState([]);
    const [prestadores, setPrestadores] = useState([]);
    const [selectedServicoNome, setSelectedServicoNome] = useState("");

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

        const servicoEncontrado = servicos.find(servico => servico.servico_id === parseInt(event.target.value, 10)); console.log("Servico encontrado:", servicoEncontrado); // Log do serviço encontrado

        const servicoNome = servicoEncontrado?.servico_nome;
        console.log("Servico Nome:", servicoNome);

        setSelectedServicoNome(servicoNome);
        console.log("Selected Servico Nome:", selectedServicoNome); // Log do estado selectedServicoNome

        buscarPrestadoresPorNomeServico(servicoNome);
    };

    const salvar = async (campos) => {
        try {
            // Adiciona os campos agendamento_hora e agendamento_servico_id ao objeto campos
            const camposCompletos = {
                ...campos,
                agendamento_hora: selectedTime,
                servicos: { servico_id: watch("servico_id") }
            };

            const response = await api.post("agendamento", camposCompletos);
            setAviso("Agendamento realizado com sucesso!");
            reset();
        } catch (error) {
            setAviso("Erro ao realizar agendamento!");
        }
    };

    useEffect(() => {
        console.log("Servicos:", servicos);
    }, [servicos]);

    return (

        <>
            <Helmet>
                <title>Agendamento</title>
            </Helmet>
            <div className="container p-5 bg-light text-dark rounded" style={{ borderColor: "#4e9c9c", borderWidth: "20px", borderStyle: "solid" }}>
                <div className="container p-5 bg-light text-dark rounded">
                    <h4 className="fst-italic mb-3">Agendamento</h4>
                    <form onSubmit={handleSubmit(salvar)}>
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Serviços"
                                aria-label="Serviços"
                                {...register("servicoNome")}
                            />
                            <button
                                className="btn btn-outline-success"
                                type="button"
                                onClick={() => buscarPrestadoresPorNomeServico(watch("servicoNome"))}
                            >
                                Pesquisar
                            </button>
                        </div>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register("servico_id")}
                            defaultValue=""
                            onChange={handleServicoChange}
                        >
                            <option value="" disabled>Selecione um serviço</option>
                            {servicos.map(servico => (
                                <option key={servico.servico_id} value={servico.servico_id}>{servico.servico_nome}</option>
                            ))}
                        </select>
                        <br />
                        <select className="form-select" aria-label="Prestadores" {...register("prestador_id")} defaultValue="" disabled={!selectedServicoNome}>
                            <option value="" disabled>Selecione um prestador</option>
                            {prestadores.map((prestador) => (
                                <option key={prestador.prestador_id} value={prestador.prestador_id}>{prestador.prestador_nome}</option>
                            ))}
                        </select>
                        <br />
                        <div>
                            <label>Escolha a data que você deseja agendar o Serviço:</label>
                            <br />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                            />
                        </div>
                        <br />
                        <h6>Selecione um horário:</h6>
                        <div className="input-group mb-3">
                            <input
                                type="time"
                                className="form-control"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Agendar</button>

                        <section className="images">
                            <img src={'cara da lupa.svg'} alt="Mobile" />
                            <div className="circle"></div>
                        </section>

                    </form>
                    <div className="alert mt-3">{aviso}</div>
                </div>
            </div>

        </>

    );
};

export default agendamento_servicos;