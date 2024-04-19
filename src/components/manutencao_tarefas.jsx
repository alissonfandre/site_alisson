import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";  

const ManutencaoTarefas = () => {
    //servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
    //guardar e setar as informações do objeto
    const [tarefas, setTarefas] = useState([]);

    const obterLista = async () => {
        try{
            const lista = await api.get("tarefas");
            setTarefas(lista.data);
        }catch(error){
            alert(`Erro: ..Não foi possível obter os dados: ${error}`);
        }
    }


//define o método que será executado assim que o componente
// for renderizado
useEffect(() => {
    obterLista();
},[]);

const filtrarLista = async (campos) => {
    try{
        const lista = await api.get(`tarefas/filtro/${campos.palavra}`);
        lista.data.length
        ? setTarefas(lista.data)
        : alert("Não há tarefas cadastradas com a palavra chave pesquisada");
    }catch(error){
        alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
}

const excluir = async(id,titulo) => {
    if(!window.confirm(`Confirma a exclusão do Tarefa ${titulo}?`)){
        return;
    }
    try{
        console.log("id é:"+id)
        await api.delete(`tarefas/${id}`);
        //formar uma nova lista de tarefas sem a tarefa que foi excluida
        setTarefas(tarefas.filter(Tarefas => tarefas.id !== id));
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível excluir a tarefa ${titulo}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id,titulo,index) => {
    const novoStatus = prompt(`Digite o novo status da tarefa ${titulo}`);
    if (novoStatus == "" ) {
        alert('Digite um status válido!(status em branco)')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        await api.put(`tarefas/${id}`,{status: novoStatus});
        
        const TarefasAtualizadas = [...tarefas];
        const indiceTarefas = TarefasAtualizadas.find(Tarefas => Tarefas.id === id);
        console.log("indice tarefa:"+indiceTarefas);
        TarefasAtualizadas[indiceTarefas.id].status = novoStatus;
        setTarefas(TarefasAtualizadas);
        obterLista();
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível alterar a tarefa ${titulo}: ${error}`);
    }
}

    return (
       <div className="container">
        <div className="row">
            <div className="col-sm-7">
                <h4 className="fst-italic mt-3">Manutenção de Tarefas</h4>
            </div>
            <div className="col-sm-5">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Titulo" required {...register("palavra")} />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:""});obterLista();}}/>
                    </div>
                </form>
            </div>
        </div>

        <table className="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Data Criação</th>
                    <th>Data Limite</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {tarefas.map((tarefa) => (
                    <ItemLista
                        key={tarefa.id}
                        id={tarefa.id}
                        titulo={tarefa.titulo}
                        descricao={tarefa.descricao}
                        status={tarefa.status}
                        data_criacao={tarefa.data_criacao}
                        data_limite={tarefa.data_limite}
                        excluirClick={()=>excluir(tarefa.id,tarefa.titulo)}
                        alterarClick={()=>alterar(tarefa.id,tarefa.titulo)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ManutencaoTarefas;